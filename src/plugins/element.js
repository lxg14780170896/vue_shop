import Vue from "vue";
import {Pagination,MessageBox,FormItem,Form,Dialog,Input,Col,Table,TableColumn, Button, Header, Container, Main, Aside, Message, Menu, MenuItem, MenuItemGroup, Submenu, Row, Card, Breadcrumb, BreadcrumbItem } from 'element-ui'
Vue.use(Button)
Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Col)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Pagination)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm