import Vue from 'vue'
import {
    Button,
    Header,
    Main,
    Footer,
    Container,
    Row,
    Col,
    Input,
    Pagination,
    Message,
    Form,
    FormItem,
    RadioGroup,
    Radio,
    MessageBox,
    Select,
    Option,
    Card,
    Alert,
    Dialog,
    Divider,
    Tabs,
    TabPane,

} from 'element-ui'

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Card)
Vue.use(Alert)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$message = Message;
Vue.prototype.$confirm=MessageBox;