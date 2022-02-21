<?php


namespace app\teacher\controller;


use app\admin\controller\Base;
use think\Controller;

class Timuguanli extends Base
{

    public function chakan()
    {
        $list = db('timu_type')->select();
        $this->assign('list', $list);
        return view();
    }

    public function wodetimu()
    {
        return view();
    }

    public function xuantiguanli()
    {
        $list = db('timu_type')->select();
        $this->assign('list', $list);
        return view();
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
                $where .= " or r.type_name like '%" . $key . "%'";
                $where .= " or g.realname like '%" . $key . "%'";
                $where .= " or xuantiqingkuang like '%" . $key . "%')";
            }
            if ($role_id > 0) {
                $where .= " and (r.type_id=" . $role_id . ")";
            }
            $list = db('timu')->alias('u')
            ->join('timu_type r', 'u.timuleixing = r.type_id', 'left')
                ->field('u.*,r.type_name')
                ->join('sys_user g', 'u.zhidaolaoshi = g.user_id', 'left')
                ->field('u.*,g.realname')
            ->where($where)->where("shenhezhuangtai","同意")
                //->order('role_id,u.user_id')
                ->paginate($limit)
                ->toArray();

            $length = count($list['data']);
            for ($x = 0; $x < $length; $x++) {
                $lll='';
                $lin=explode(",",$list['data'][$x]['xuantiren']);
                $leng = count($lin);
                for ($y = 1; $y < $leng; $y++)
                {
                    $lll.=  db('sys_user')->where('user_id',$lin[$y])
                        ->value('realname').' ';
                }
                $list['data'][$x]['xuantiren']=$lll;
            }
            return $this->showList($list);
        }
    }

    public function getwodetimu()
    {

        if (request()->isAjax()) {
            $get = input('get.');
            $limit = $get['limit'] ?? 10;

            $data=session("user_id");
            $list = db('timu')->alias('u')
                ->join('timu_type r', 'u.timuleixing = r.type_id', 'left')
                ->field('u.*,r.type_name')

                ->where('zhidaolaoshi',$data)
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

            $data=session("user_id");
            $list = db('timu')->alias('u')
//                ->join('guanlian t', 'u.timu_id = t.timu_id', 'right')
//                ->field('u.*,t.student,t.shenhe')
                ->join('xuanti t', 'u.timu_id = t.timu_id', 'right')
                ->where('t.shenhezhuangtai','<>','自己退选')
                ->field('u.*,t.student,t.shenhezhuangtai,t.xuanti_id')

                ->join('sys_user g', 't.student = g.user_id', 'left')
                ->field('u.*,g.realname')

                ->join('timu_type r', 'u.timuleixing = r.type_id', 'left')
                ->field('u.*,r.type_name')

                ->where('zhidaolaoshi',$data)
                ->where('u.shenhezhuangtai','同意')
                //->order('role_id,u.user_id')
                ->paginate($limit)
                ->toArray();
            return $this->showList($list);
        } else {
            $list = db('timu')->select();
            $this->assign('list', $list);
            return view();
        }
    }


    public function timu_form()
    {
        if (request()->isPost()) {
            $data = input('post.');
            if ($data['timu_id'] == null) {
                $user = db('timu')->where(['timu' => $data['timu']])->find();
                if ($user) {
                    $this->error('题目名已经存在！');
                }
                $date=date('Y-m-d H:i:s', time());
                $data['chutitime']=$date;
                $data['timu_id']= date('Ymd') . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
                $data['xuantiqingkuang']=0;
                $data['shenhezhuangtai']="等待审核";
                $data['zhidaolaoshi']=session("user_id");
                db('timu')->insert($data);
                return $this->success('题目添加成功！');
            } else {
                $user = db('timu')
                    ->where('timu', $data['timu'])
                    ->where('timu_id', '<>', $data['timu_id'])
                    ->find();
                if ($user) {
                    $this->error('题目已经存在！');
                }
                $tmp=db('timu')->where('timu_id',$data['timu_id'])->find();
                    if($tmp['shenhezhuangtai']!='等待审核')
                    {
                        return $this->error("已被审核，无法修改");
                    }
                db('timu')->update($data);
                return $this->success('题目编辑成功！');
            }
        }
        else {
            $list = db('timu_type')->select();
            $this->assign('list', $list);
            return view();
        }
    }


    public function tongyi()
    {
        $xuanti_id=input('post.xuanti_id');
        $timu_id=input('post.timu_id');
        $student=input('post.student');
        $tmp=db('xuanti')->where('xuanti_id',$xuanti_id)->find();
        $tmp1=db('timu')->where('timu_id',$timu_id)->find();
        $guize=db('guize')->where('role_id',12)->find();
        $rencount=$guize['renshu'];
        $ccccc=db('timu')->where('zhidaolaoshi',$tmp1['zhidaolaoshi'])->where('shenhezhuangtai','同意')->sum('yitongyi');

        if($tmp['shenhezhuangtai']=="等待审核")
        {
            if($ccccc==$rencount)
            {
                return $this->error("人数已满，不能再同意");
            }
            db('xuanti')->where('xuanti_id',$xuanti_id)
                ->update(['status'=>2,'shenhezhuangtai'=>'同意']);
            db('timu')->where('timu_id',$timu_id)->update(['yitongyi'=>$tmp1['yitongyi']+1]);

            if($ccccc+1==$rencount)
            {
               $aaa=db('xuanti')->alias('r')->join('timu g','r.timu_id=g.timu_id','left')
                    ->field('r.*,g.zhidaolaoshi')->where('g.zhidaolaoshi',$tmp1['zhidaolaoshi'])
                    ->where('r.shenhezhuangtai','等待审核')
              ->select();
               $leng=count($aaa);
               if($leng>0)
               {
                   for($x=0;$x<$leng;$x++)
                   {
                       db('xuanti')->where('xuanti_id',$aaa[$x]['xuanti_id'])
                           ->update(['shenhezhuangtai'=>'自动拒绝','status'=>0]);
                       $tmp123=db('timu')->where('timu_id',$aaa[$x]['timu_id'])->find();
                       db('timu')
                           ->where('timu_id',$aaa[$x]['timu_id'])
                           ->update(['xuantiqingkuang'=>$tmp123['xuantiqingkuang']-1
                               ,'xuantiren'=>str_replace(','.$aaa[$x]['student'],'',$tmp123['xuantiren'])
                           ]);
                       db('xuantishu')->where('student',$aaa[$x]['student'])->update(['geshu'=>0]);
                   }
                   return $this->success("已同意，且人数已满，已自动拒绝其他学生");
               }
               else return $this->success('已同意');
            }

            return $this->success('已同意');
        }
        else return $this->error('该学生选题已审核过');
    }

    public function jujue()
    {
        $xuanti_id=input('post.xuanti_id');
        $timu_id=input('post.timu_id');
        $student=input('post.student');

        $tmp=db('xuanti')->where('xuanti_id',$xuanti_id)->find();
        $tmp123=db('timu')->where('timu_id',$timu_id)->find();

        if($tmp['shenhezhuangtai']=="等待审核")
        {
            db('timu')
                ->where('timu_id',$timu_id)
                ->update(['xuantiqingkuang'=>$tmp123['xuantiqingkuang']-1
                    ,'xuantiren'=>str_replace(','.$student,'',$tmp123['xuantiren'])
                ]);
            db('xuantishu')->where('student',$student)->update(['geshu'=>0]);
            db('xuanti')->where('xuanti_id',$xuanti_id)
                ->update(['status'=>0,'shenhezhuangtai'=>'拒绝']);
            return $this->success('已拒绝');
        }
        else return $this->error('该学生选题已审核过');
    }

    public function timuDel()
    {
        $tmp=db('timu')->where('timu_id',input('post.timu_id'))->find();

        if($tmp['shenhezhuangtai']!='等待审核')
        {
            return $this->error("已被审核，无法删除");
        }

        if($tmp['xuantiqingkuang']==0)
        {
            db('timu')->where('timu_id',input('post.timu_id'))->delete();
            return $this->success('删除成功!');
        }
        else
        {
            return $this->error('该题目有同学选且你同意或等待你同意');
        }

    }

}