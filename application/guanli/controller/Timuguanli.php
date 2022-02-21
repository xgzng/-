<?php


namespace app\guanli\controller;

use app\admin\controller\Base;
use think\Controller;

class Timuguanli extends Base
{
    public function jujueyuanyin()
    {
        return view();
    }

    public function pjujueyuanyin()
    {
        //$tmp=input('post.timu_id/a');
        //var_dump($tmp);
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
    public function gettimu()
    {
        if (request()->isAjax()) {
            $get = input('get.');
            $limit = $get['limit'] ?? 10;
            $key = $get['key'] ?? '';
            $role_id = $get['type'] ?? 0;
            $xingming=$get['xingming'] ?? '';
            $shenhe=$get['shenhe'] ?? '';

            $where = 'timu_id!=1';
            if ($key) {
                $where .= " and (timu like '%" . $key . "%'";
                $where .= " or type_name like '%" . $key . "%'";
                $where .= " or realname like '%" . $key . "%'";
                $where .= " or xuantiqingkuang like '%" . $key . "%')";
            }
            if($shenhe){
                $where .= " and (shenhezhuangtai like '%" . $shenhe . "%')";
            }
            if($xingming)
            {
                $where .= " and (zhidaolaoshi like '%" . $xingming . "%')";
            }
            if ($role_id > 0) {
                $where .= " and (r.type_id=" . $role_id . ")";
            }
            $list = db('timu')->alias('u')
                ->join('timu_type r', 'u.timuleixing = r.type_id', 'left')
                ->field('u.*,r.type_name')

                ->join('sys_user g', 'u.zhidaolaoshi = g.user_id', 'left')
                ->field('u.*,g.realname')

                ->where($where)
                //->order('role_id,u.user_id')
                ->paginate($limit)
                ->toArray();
//            $da=strtotime($list['data']['chutitime']);
//            $list['data']['chutitime']=date("Y-m-d H:i",$da);

            $length = count($list['data']);

            for ($x = 0; $x < $length; $x++) {
                $lll='';
                $lin=explode(",",$list['data'][$x]['xuantiren']);
                $leng = count($lin);
                //  var_dump($lin);
                for ($y = 1; $y < $leng; $y++)
                {
                    $lll.= db('sys_user')->where('user_id',$lin[$y])
                            ->value('realname').' ';
                }
                $list['data'][$x]['xuantiren']=$lll;
            }
          //  var_dump($list);
            return $this->showList($list);
        } else {
            $list = db('timu')->select();
            $this->assign('list', $list);
            return view();
        }
    }

    public function tongyi()
    {
        $timu_id=input('post.timu_id');
        $tmp=db('timu')->where('timu_id',$timu_id)->find();

        if($tmp['shenhezhuangtai']=="等待审核")
        {
            db('timu')->where('timu_id',$timu_id)->update(['shenhezhuangtai'=>"同意"]);
            return $this->success('已同意');
        }
        else return $this->error('该题目已审核过');
    }

    public function ptongyi()
    {
        $tmp=input('post.timu_id/a');
        //var_dump($tmp);
        foreach ($tmp as $key=>$value)
        {
           $ttt= db('timu')->where('timu_id',$value)->find();
            if($ttt['shenhezhuangtai']!='等待审核')
                return $this->error("存在已审核的题目");
        }
        foreach ($tmp as $key=>$value)
        {
            db('timu')->where('timu_id',$value)->update(['shenhezhuangtai'=>"同意"]);
        }
            //db('timu')->where('timu_id',input('post.timu_id/a'))->update(['shenhezhuangtai'=>"同意"]);
        return $this->success('已批量同意');
    }

    public function pjujue()
    {
        $tmp=input('post.timu_id/a');
        //var_dump($tmp);
        $juyuan=input('post.jujueyuanyin');
        if($juyuan==NULL)
        {
            return $this->error("拒绝原因为空，重新尝试");
        }
        foreach ($tmp as $key=>$value)
        {
            $ttt= db('timu')->where('timu_id',$value)->find();
            if($ttt['shenhezhuangtai']!='等待审核')
                return $this->error("失败，存在已审核的题目");
        }
        foreach ($tmp as $key=>$value)
        {
            db('timu')->where('timu_id',$value)->update(['shenhezhuangtai'=>"拒绝",'jujueyuanyin'=>$juyuan]);
        }
        //db('timu')->where('timu_id',input('post.timu_id/a'))->update(['shenhezhuangtai'=>"同意"]);
        return $this->success('已批量拒绝');
    }

    public function jujue()
    {
        $timu_id=input('post.timu_id');
        $jujueyuanyin=input('post.jujueyuanyin');
        $tmp=db('timu')->where('timu_id',$timu_id)->find();

        if($tmp['shenhezhuangtai']=="等待审核")
        {
            db('timu')->where('timu_id',$timu_id)->update(['shenhezhuangtai'=>"拒绝",'jujueyuanyin'=>$jujueyuanyin]);
            return $this->success('已拒绝');
        }
        else return $this->error('失败，该题目已审核过');
    }

}