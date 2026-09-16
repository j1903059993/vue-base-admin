export type UserStatus = 'active' | 'disabled'
export interface AdminUser { id:number; name:string; email:string; role:string; department:string; status:UserStatus; lastLogin:string }
export const seedUsers: AdminUser[] = [
  {id:1,name:'姜兴杰',email:'jxingjie@example.com',role:'超级管理员',department:'产品研发中心',status:'active',lastLogin:'2026-09-16 09:32'},
  {id:2,name:'林子轩',email:'linzx@example.com',role:'运营管理员',department:'用户运营部',status:'active',lastLogin:'2026-09-16 08:45'},
  {id:3,name:'沈知夏',email:'shenzx@example.com',role:'审计员',department:'风险控制部',status:'active',lastLogin:'2026-09-15 18:20'},
  {id:4,name:'周亦辰',email:'zhouyc@example.com',role:'普通成员',department:'数据平台组',status:'disabled',lastLogin:'2026-09-11 14:08'},
  {id:5,name:'许清和',email:'xuqh@example.com',role:'普通成员',department:'产品研发中心',status:'active',lastLogin:'2026-09-16 10:12'},
  {id:6,name:'宋景明',email:'songjm@example.com',role:'运营管理员',department:'市场增长部',status:'active',lastLogin:'2026-09-14 16:54'},
  {id:7,name:'顾晚舟',email:'guwz@example.com',role:'普通成员',department:'客户成功部',status:'active',lastLogin:'2026-09-13 11:25'},
  {id:8,name:'程以安',email:'chengya@example.com',role:'审计员',department:'风险控制部',status:'disabled',lastLogin:'2026-09-08 09:17'},
  {id:9,name:'叶星澜',email:'yexl@example.com',role:'普通成员',department:'产品研发中心',status:'active',lastLogin:'2026-09-16 11:03'},
  {id:10,name:'陆沉舟',email:'lucz@example.com',role:'普通成员',department:'数据平台组',status:'active',lastLogin:'2026-09-12 17:48'},
  {id:11,name:'温如言',email:'wenry@example.com',role:'运营管理员',department:'用户运营部',status:'active',lastLogin:'2026-09-15 10:33'},
  {id:12,name:'江屿白',email:'jiangyb@example.com',role:'普通成员',department:'客户成功部',status:'active',lastLogin:'2026-09-10 13:06'},
]
