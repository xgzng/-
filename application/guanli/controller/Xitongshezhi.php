<?php


namespace app\guanli\controller;


use app\admin\controller\Base;

class Xitongshezhi extends Base
{
    public function index()
    {
        if (request()->isAjax()) {
            $list = db('timu_type')->select();
            return $this->showAll($list);
        } else {
            return view();
        }
    }

    public function zhicheng()
    {
        if (request()->isAjax()) {
            $list = db('zhicheng')->select();
            return $this->showAll($list);
        }
    }

    public function xueli()
    {
        if (request()->isAjax()) {
            $list = db('xueli')->select();
            return $this->showAll($list);
        }
    }

    public function typeForm()
    {
            return view('type_form');
    }

    public function typeDeal()
    {
        $data = input('post.');
        if ($data['type_id'] == null) {
            db('timu_type')->insert($data);
            return $this->success('添加成功！');
        } else {
            db('timu_type')->update($data);
            return $this->success('编辑成功！');
        }
    }

    public function typeDel()
    {
        $id = input('post.type_id');
        $sub = db('timu')->where("timuleixing", $id)->find();
        if ($sub) {
            return $this->error('该类别有题目，删除失败!');
        } else {
            db('timu_type')->delete($id);
            return $this->success('删除成功!');
        }
    }

    public function zhichengForm()
    {
            return view('zhicheng_form');
    }
    public function zhichengDeal()
    {
        $data = input('post.');
        if ($data['zhicheng_id'] == null) {
            db('zhicheng')->insert($data);
            return $this->success('添加成功！');
        } else {
            db('zhicheng')->update($data);
            return $this->success('编辑成功！');
        }
    }

    public function zhichengDel()
    {
        $id = input('post.zhicheng_id');
        $sub = db('sys_user')->where("zhicheng", $id)->find();
        if ($sub) {
            return $this->error('该职称有人员，删除失败!');
        } else {
            db('zhicheng')->delete($id);
            return $this->success('删除成功!');
        }
    }

    public function xueliForm()
    {
            return view('xueli_form');
    }

    public function xueliDel()
    {
        $id = input('post.xueli_id');
        $sub = db('sys_user')->where("xueli", $id)->find();
        if ($sub) {
            return $this->error('该学历有人员，删除失败!');
        } else {
            db('xueli')->delete($id);
            return $this->success('删除成功!');
        }
    }

    public function xueliDeal()
    {
        $data = input('post.');
        if ($data['xueli_id'] == null) {
            db('xueli')->insert($data);
            return $this->success('添加成功！');
        } else {
            db('xueli')->update($data);
            return $this->success('编辑成功！');
        }
    }

    public function canshushezhi()
    {
        if (request()->isPost()) {
            $data = input('post.');
            if(strtotime($data['jieshutime'])<strtotime($data['time']))
            {
                return $this->error('结束时间不能小于开始时间');
            }
            //var_dump($data);
            db('guize')->where('role_id',12)->strict(false)->update($data);
            return $this->success('参数更新成功！');

        } else {
           // $user_id=session('user_id');
            $data = db('guize')->where('1=' . 1)->find();
            $this->assign('data', json_encode($data, true));

            return view();
        }
    }

    public function zidianshezhi()
    {
        return view();
    }

    public function gerenxinxi()
    {
        if (request()->isPost()) {
            $data = input('post.');
            db('sys_user')->strict(false)->update($data);
            return $this->success('用户信息更新成功！');
        } else {
            $user_id=session('user_id');
            $data = db('sys_user')->where('user_id=' . $user_id)->find();
            $this->assign('src', $data['avatar']);
            $this->assign('data', json_encode($data, true));
            return view('gerenxinxi');
        }
    }

    public function mimaguanli()
    {
        if (request()->isPost()) {
            $data = input('post.');
            db('sys_user')->update($data);
            return $this->success('用户信息更新成功！');
        } else {
            return view('mimaguanli');
        }
    }

    public function modiPwd(){
        $data=input("post.");
        $user = db('sys_user')->where('user_id', session("user_id"))->find();
        if($user['password'] != md5($data['oldPsw'])){
            return $this->error('原密码错误!');
        }else{
            $data['user_id']=(string)(session("user_id"));
            $data['password']=md5($data['newPsw']);
            //注意要删除前台确认新密码的name属性和删除数据中的oldPassword的值，
            //因为加了的话会传到后台来而数据库没有此字段，会造成更新失败。
            /*unset($data['oldPsw']);
            unset($data['newPsw']);
            if (db('sys_user')->update($data)!==false) {*/
            //strict  关闭严格检查字段名  https://www.kancloud.cn/manual/thinkphp5/162902
            if (db('sys_user')->strict(false)->update($data)!==false){  //
                return $this->success('密码修改成功！');
            } else {
                return $this->error('密码修改失败!');
            }
        }
    }
    

}