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
                    <pd-select-item :listData="yearList" v-model="year" type="line"></pd-select-item>
                    <pd-select-item :listData="monthList" type="line" v-model="month"></pd-select-item>
                    <pd-select-item :listData="currentDateList" type="line" v-model="date"></pd-select-item>
                    <!--<pd-select-item v-if="is31 === 31"  :listData="dateList[3]" type="line" v-model="date"></pd-select-item>-->
                    <!--<pd-select-item v-else-if="is31 === 30"  :listData="dateList[2]" type="line" v-model="date"></pd-select-item>-->
                    <!--<pd-select-item v-else-if="is31 === 2 && !isLeap"  :listData="dateList[1]" type="line" v-model="date"></pd-select-item>-->
                    <!--<pd-select-item v-else  :listData="dateList[0]" type="line" v-model="date"></pd-select-item>-->
                </pd-select-box>
            </div>
        </div>
    </div>


</template>
<script>
    export default {
        data(){
            return{
                yearList:[],
                monthList:[],
                dateList:[],
                year:'',
                month:'',
                date:'',
                showAll:false,
                showPicker:true,
                defaultDate:'',
            }
        },
        props: {
        },
        computed:{
            yearIndex:function(){
                return this.yearList.indexOf(this.year);
            },
            monthIndex:function(){
                return this.monthList.indexOf(this.month);
            },
            dateIndex:function(){
                return this.dateList[3].indexOf(this.date);
            },
            isLeap:function(){
                let yearIndex = this.yearIndex
                if(yearIndex > -1){
                    let year = 1900 + yearIndex;
                    return year%4 ===  0 && year%100 !== 0 || year%400 === 0;
                }else{
                    return false
                }
            },
            // 根据月份或者年份判断日期数组
            is31:function(){
                let monthIndex = this.monthIndex
                if(monthIndex > -1){
                    let month = monthIndex + 1 ;
                    if(month === 2 || month === 4 || month === 6 || month === 9 || month === 11 ){
                        if(month === 2){
                            return 2
                        }else{
                            return 30
                        }
                    }else{
                        return 31
                    }
                }else{
                    return false
                }
            },
            currentDateList:function(){
                let current;
                switch (this.is31) {
                    case 31:
                        current = this.dateList[3];
                        break;
                    case 30:
                        current = this.dateList[2];
                        if(current.indexOf(this.date) === -1){
                            this.date = '30日'
                        }

                        break;
                    case 2:
                        if(this.isLeap){
                            current = this.dateList[1];
                            if(current.indexOf(this.date) === -1){
                                this.date = '29日'
                            }
                        }else{
                            current = this.dateList[0];
                            if(current.indexOf(this.date) === -1){
                                this.date = '28日'
                            }
                        }
                        break;
                    default:
                        current = this.dateList[3];
                        break

                }
                return current;
            }

        },
        watch:{
            defaultDate:function(val){
                console.log(val)
                let valList = val.split('-');
                this.year = `${parseInt(valList[0])}年`;
                this.month = `${parseInt(valList[1])}月`;
                this.date = `${parseInt(valList[2])}日`;
            }
        },
        created(){
            // 初始化化日期数据
            this.getDate();
            this.createData();
        },
        mounted(){
        },
        methods: {
            createData(){
                let yearList = new Array(150);
                let monthList = new Array(12);
                let date28 = new Array(28);
                let dateList = [];
                for(let i = 0 ; i < 150 ; i++){
                    let y = 1900 + i ;
                    let m = 1 + i;
                    let d = 1 + i;
                    yearList[i]=`${y}年`;
                    if(i < 12){
                        monthList[i]=`${m}月`
                    }
                    if(i < 28){
                        date28[i]=`${d}日`
                    }
                }
                dateList.push(date28);
                dateList.push(date28.concat('29日'));
                dateList.push(date28.concat('29日','30日'));
                dateList.push(date28.concat('29日','30日','31日'));
                this.yearList = yearList;
                this.monthList = monthList;
                this.dateList = dateList;
            },
            getDate(){
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let date = now.getDate();
                this.year = `${year}年`;
                this.month = `${month}月`;
                this.date = `${date}日`;
            },
            getValue(){
                return `${this.yearIndex + 1900}-${this.trans(this.monthIndex + 1)}-${this.trans(this.dateIndex +1)}`;
            },
            trans(num){
                return num > 9 ? num : '0'+ num;
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