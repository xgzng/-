<?php


namespace app\student\controller;


use app\admin\controller\Base;
use think\Controller;

class Timuguanli extends Base
{

    public function wodexuanti()
    {
        return view();
    }

    public function chakan()
    {
        $list = db('timu_type')->select();
        $this->assign('list', $list);
        return view();
    }
    public function xuantiguanli()
    {
        $list = db('timu_type')->select();
        $this->assign('list', $list);
        return view();
    }

    public function tuixuan()
    {
        $xuanti_id=input('post.xuanti_id');
        $timu_id=input('post.timu_id');
        $ttt=session("user_id");
        $po=db('xuanti')->where('xuanti_id',$xuanti_id)->find();
        if($po['shenhezhuangtai']=='同意')
        {
            return $this->error("已被同意不能修改");
        }
        $tmp=db('timu')->where('timu_id',$timu_id)->find();
        $tttttt=$tmp['xuantiqingkuang']-1;
        db('timu')->where('timu_id',$timu_id)
            ->update(['xuantiqingkuang'
            =>$tttttt, 'xuantiren'=>str_replace(','.$ttt,'',$tmp['xuantiren'])]);
        db('xuantishu')->update(['student'=>$ttt,'geshu'=>0]);
        db('xuanti')->where('xuanti_id',$xuanti_id)
            ->update(['shenhezhuangtai'=>'自己退选']);

        return $this->success("退选成功");
    }

    public function xuanti()
    {
        $date=date('Y-m-d H:i:s', time());

        $guize=db('guize')->where('role_id',12)->find();
        $xuantishu= 1;         //$guize['timushu'];
        $shdate=$guize['time'];
        $sshdate=$guize['jieshutime'];

        if((strtotime($date)-strtotime($sshdate))>=0)
            return $this->error("选课已结束，结束时间".$sshdate);

        if((strtotime($date)-strtotime($shdate))>=0){                   //对两个时间差进行差运算

            $timu_id=input('post.timu_id');
            $tmp=db('timu')->where('timu_id',$timu_id)->find();

            $user=session("user_id");
            $er=db('xuanti')->where('student',$user)
                //->where('timu_id',$timu_id)
                ->where('shenhezhuangtai','同意')->find();
            $err=db('xuanti')
                ->where('student',$user)
                ->where('timu_id',$timu_id)
                //->where('shenhezhuangtai','<>','自己退选')
                ->where('shenhezhuangtai','<>','自己退选')
                ->find();
            if($er['shenhezhuangtai']=='同意')
            {
                return $this->error("已被同意");
            }

            if($err['status']==0&&$err)
            {
                return $this->error("被拒绝不能再选");
            }

            $rencount=$guize['renshu'];
            $ccccc=db('timu')->where('zhidaolaoshi',$tmp['zhidaolaoshi'])
                ->where('shenhezhuangtai','同意')->sum('yitongyi');
            //var_dump($ccccc);
            if($ccccc==$rencount)
            {
                return $this->error("该导师人数已满，不能再选");
            }

            $date111=date('Ymd') . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);

            $nam=$tmp['xuantiren'].','.$user;

            $ttt=session("user_id");
            $mo=db('xuantishu')->where('student',$ttt)->find();
            if($mo['geshu']==$xuantishu)
            {
                return $this->error("已选".$xuantishu."题，不能再选，等待审核或被拒绝后再选");
            }
            else if($mo['geshu']<$xuantishu && $mo!=NULL)
            {
                db('timu')->where('timu_id',$timu_id)
                    ->update(['xuantiqingkuang'=>$tmp['xuantiqingkuang']+1,'xuantiren'=>$nam]);

                db('xuantishu')->update(['student'=>$ttt,'geshu'=>$mo['geshu']+1]);
                db('xuanti')->insert(['student'=>$ttt,'timu_id'=>$timu_id
                        ,'shenhezhuangtai'=>'等待审核','status'=>1,'xuanti_id'=>$date111
                    ]
                );
                return $this->success("成功选题");
            }
            else
            {
                db('timu')->where('timu_id',$timu_id)
                    ->update(['xuantiqingkuang'=>$tmp['xuantiqingkuang']+1,'xuantiren'=>$nam]);
                db('xuantishu')->insert(['student'=>$ttt,'geshu'=>1]);
                db('xuanti')->insert(['student'=>$ttt,'timu_id'=>$timu_id
                        ,'shenhezhuangtai'=>'等待审核','status'=>1,'xuanti_id'=>$date111
                    ]
                );
                return $this->success("成功选题");
            }
        }

        else{
            return $this->error("选课时间未到，请等到".$shdate."再选");
        }
    }

    public function gettimu()
    {
        if (request()->isAjax()) {
            $get = input('get.');
            $limit = $get['limit'] ?? 10;
            $key = $get['key'] ?? '';
            $role_id = $get['type'] ?? 0;

            $where = 'timu_id!=1';
            if ($key) {
                $where .= " and (timu like '%" . $key . "%'";
                $where .= " or type_name like '%" . $key . "%'";
                $where .= " or realname like '%" . $key . "%'";
                $where .= " or xuantiqingkuang like '%" . $key . "%'";
                $where .= " or timu_id like '%" . $key . "%')";
            }

            if ($role_id > 0) {
                $where .= " and (r.type_id=" . $role_id . ")";
            }
            $list = db('timu')->alias('u')
            ->join('timu_type r', 'u.timuleixing = r.type_id', 'left')
            ->field('u.*,r.type_name')

                ->join('sys_user g', 'u.zhidaolaoshi = g.user_id', 'left')
                ->field('u.*,g.realname')
            ->where($where)->where("shenhezhuangtai", "同意")
                ->paginate($limit)
                ->toArray();

            $length = count($list['data']);

            for ($x = 0; $x < $length; $x++) {
                $lll='';
                $lin=explode(",",$list['data'][$x]['xuantiren']);
                $leng = count($lin);
              //  var_dump($lin);
                for ($y = 1; $y < $leng; $y++)
                {
                    $lll.=  db('sys_user')->where('user_id',$lin[$y])
                        ->value('realname').' ';
                }
                $list['data'][$x]['xuantiren']=$lll;
            }

            return $this->showList($list);
        } else {
            $list = db('timu')->select();
            $this->assign('list', $list);
            return view();
        }
    }

    public function getwodetimu()
    {

        if (request()->isAjax()) {
            $get = input('get.');
            $limit = $get['limit'] ?? 10;

            $data = session("user_id");
            $list = db('xuanti')->alias('u')
                ->join('timu g', 'u.timu_id = g.timu_id', 'left')
                ->field('u.*,g.zhidaolaoshi,g.timu,g.timuleixing')

                ->join('timu_type r', 'g.timuleixing = r.type_id', 'left')
                ->field('u.*,r.type_name')

                ->join('sys_user x', 'g.zhidaolaoshi = x.user_id', 'left')
                ->field('u.*,x.realname')

            ->where('student', $data)->where('u.shenhezhuangtai','in',['等待审核','同意'])
                //->order('role_id,u.user_id')
                ->paginate($limit)
                ->toArray();
            return $this->showList($list);
        }
    }

    public function getwodetimu2()
    {

        if (request()->isAjax()) {
            $get = input('get.');
            $limit = $get['limit'] ?? 10;

            $data = session("user_id");
            $list = db('xuanti')->alias('u')
                ->join('timu x', 'u.timu_id = x.timu_id', 'left')
                ->field('u.*,x.zhidaolaoshi,x.timu,x.timuleixing')

                ->join('timu_type r', 'x.timuleixing = r.type_id', 'left')
                ->field('u.*,r.type_name')

                ->join('sys_user g', 'x.zhidaolaoshi = g.user_id', 'left')
                ->field('u.*,g.realname')

            ->where('student', $data)->where('u.shenhezhuangtai','<>','等待审核')
                ->where('u.shenhezhuangtai','<>','同意')
                ->paginate($limit)
                ->toArray();
            return $this->showList($list);
        }
    }

}