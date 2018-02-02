<template>
    <div v-if="showAll">
        <div class="pickerMask" @click="giveUp($event)">
            <div class="pickerWrapper" style="position: fixed;bottom: 0;width: 100%"  ref="pickerWrapper">
                <div class="head">
                    <div class="left" @click="clean">清除</div>
                    <div class="right" @click="finish">
                        完成
                    </div>
                </div>
                <pd-select-box >
                    <pd-select-item :listData="provinceList" v-model="province" type="line"></pd-select-item>
                    <pd-select-item :listData="cityList" v-model="city" type="line"></pd-select-item>
                    <!--<pd-select-item :listData="bigData.districtList" v-model="district" type="line"></pd-select-item>-->
                </pd-select-box>
            </div>
        </div>
    </div>

</template>
<script>
    import {dat2} from './data'
    export default {
        data(){
            return{
                cityList:[],
                districtList:[],
                province:'',
                provinceIndex:0,
                city:'',
                cityIndex:0,
                district:'',
                showAll:false,
                tagText:'name',
                codeText:'id',
                childText:'child',
                defaultValue:'',
            }
        },
        props: {
            dataList:{
                type:Array,
                default(){
                    return dat2
                }
            },
            type:{
                type:String,
                default:'two' // three
            }
        },
        computed:{
            provinceList:function(){
                let tagText = this.tagText;
                let provinceList = [];
                for(let i = 0, Len = this.dataList.length; i < Len ; i++){
                    provinceList.push(this.dataList[i][tagText]);
                }
                return provinceList
            }
        },
        watch:{
            province:function(val){
                let index = this.provinceList.indexOf(val);
                if(index > -1){
                    this.provinceIndex = index;
                    this.city='  ';
                    setTimeout(()=>{
                        //选一个空值触发
                        this.cityList = this.getCityList(index);

                    })

                }
            },
            defaultValue:function(val){
//                let cityCode = val;
//                let provCode = `${cityCode.substring(0,2)}0000`;
//                console.log(provCode)
//                let provinceIndex = this.dataList.findIndex(item=>{
//                   return item[this.codeText] === provCode;
//                })
//                let cityIndex = this.dataList[provinceIndex][this.childText].findIndex(item=>{
//                    return item[this.codeText] === cityCode;
//                })
//                this.province = this.provinceList[provinceIndex];
//                setTimeout(()=>{
//                    this.city = this.cityList[cityIndex];
//                },300)

            }
        },
        created(){
            this.init();
        },
        mounted(){
        },
        methods: {
            //初始化
            init(index){
                switch(this.type){
                    case 'two':
                        this.cityList = this.getCityList(0);
                        break;
                    case 'three':
                        this.cityList = this.getCityList(0);
                        this.districtList = this.getDistrictList(0)
                        break;
                }
            },
            getCityList(proIndex){
                let tagText = this.tagText;

                let childText = this.childText;
                let cityData = this.dataList[proIndex][childText];
                let cityList =[]
                for(let i = 0 , len = cityData.length;i<len;i++){
                    cityList.push(cityData[i][tagText])
                }
                return cityList;
            },
            getDistrictList(proIndex,cityIndex){
                let tagText = this.tagText;
                let childText = this.childText;
                let districtData = this.dataList[proIndex][childText][cityIndex][childText];
                let districtList =[]
                for(let i = 0 ,len = districtData.length;i<len;i++){
                    districtList.push(districtData[i][tagText])
                }
            },
            getValue(){
                let provinceIndex = this.provinceList.indexOf(this.province)
                let cityIndex = this.cityList.indexOf(this.city)
                return {
                    text:`${this.province}-${this.city}`,
                    provinceCode:this.dataList[provinceIndex][this.codeText],
                    cityCode:this.dataList[provinceIndex][this.childText][cityIndex][this.codeText],
                }
            },
            finish(){
                this.finishCallBack(this.getValue())
                this.showAll=false;
            },
            clean(){
                this.cleanCallBack()
                this.showAll=false;
            },
            giveUp(e){
                if(e.target.className !== 'pickerMask')return;
                setTimeout(()=>{
                    this.showAll=false;
                },300)
            },
        }
    };
</script>
<style lang="scss" scoped>
    .pickerWrapper{
        background-color: #f5f5f5;
    }
</style>