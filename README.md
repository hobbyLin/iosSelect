# 仿ios下拉选择器



## 快速开始

## 用法

**引入**


```js

// 在入口处引入基础组件和对应样式

import hdSelect from '../../../src/components/select/index';
Vue.use(hdSelect)
import '../../../src/components/select/src/select.scss';
// 这里引入时间选择器样式
import '../../../src/components/select/datePicker/src/datepicker.scss';

// 在对应页面引入

import DatePicker from '../../../src/components/select/datePicker/index'

DatePicker.open({
        // 默认时间
        defaultDate:'2034-08-09',
        // 完成回调
        finishCallBack:(value)=>{
            console.log(value)
        },
        // 清除回调
        cleanCallBack:()=>{
            console.log('clean')

        }
    })
```
