/**
 * Created by doublewood on 2018/2/1.
 */
/**
 * Created by doublewood on 2018/1/31.
 */
import Vue from 'vue';
import cityPicker from './cityPicker.vue';

// 默认参数
/*
 *   finishCallBack 完成回调
 *   cleanCallBack 清除回调
 *
 *
 *
 */


let defaultOpt = {

}

const CityPickerComponent = Vue.extend(cityPicker);
let instance, currentMsg;
let msgQueue = [];

class CityPiker{
    constructor(args) {
        this.initInstance(args);
    }
    initInstance(options){
        let _this = this;
        msgQueue.push({
            options: _this.merge({}, defaultOpt, options)
        })
        _this.showNextMsg();
    }
    merge(target){
        for(let i = 1, len = arguments.length; i < len ; i++){
            let source = arguments[i];
            for(let prop in source){
                if(source.hasOwnProperty(prop)){
                    let val = source[prop];
                    if(val !== undefined){
                        target[prop] = val;
                    }
                }
            }
        }
        return target;
    }
    showNextMsg(){
        if(!instance){
            instance = new CityPickerComponent({
                el : document.createElement('div')
            })
        }
        if(msgQueue.length > 0 ){
            currentMsg = msgQueue.shift();
            let options = currentMsg.options;
            for(let prop in options){
                if(options.hasOwnProperty(prop)){
                    instance[prop] = options[prop]
                }
            }
            document.body.appendChild(instance.$el)
            Vue.nextTick(()=>{
                instance.showAll = true;
            })
        }
    }
}
export default  {
    open: (params = {})=>{
        new CityPiker(params)
    }
}