<template lang="pug">
  div
    main-nav
    loading(:active.sync="isLoading" 
              :can-cancel="false"
              :is-full-page="true")
    .content-wrapper
      h1.main-title 
        b 전국 대기건강지수 순위
      
      .district-search-box-wrapper.text-center
        //- .input-group
          input.form-control.searchBox.main-border-color(style='padding: 0.26rem;padding-left: 0.6rem;' type="text" class="form-control" placeholder="원하시는 지역을 검색하세요" v-model="searchQuery" @keyup.enter.prevent="searchLocation()" @keyup.esc="searchList=null")
          //- img.seachCancelBtn(src="https://img.icons8.com/ios/50/000000/cancel.png" v-bind:class="{hide: searchQuery == null}" @click="searchQuery = null; searchList=null;")
          .input-group-append(style="display: inline-block;")
            button.btn.btn-secondary.main-bg-color.searchBtn(type="submit" @click.prevent="searchLocation()"  @blur="searchList=null")
              i.fa.fa-search
        .form-group.mi-form-group.mi-form-group--last
          b-form-select.form-control.mi-input.mi-top-input.mb-0(v-model="selected.SD_CD" :options="options.sd"  @change.native="getDataBySD_CD")
          b-form-select.form-control.mi-input.mi-top-input.mb-0(v-model="selected.date" :options="options.date" @change.native="getDataByDate")
          
      .table-box
        .filter-wrapper
          .left
            button.btn-main(href="#" @click.prevent="onIndexTotalPm10Toggle()" :class="{active: filterToggle.health}") 대기건강지수
            button.btn-main(href="#" @click.prevent="onOverallDeathToggle()" :class="{active: filterToggle.overallDeath}") 초과사망자수
          .right
            button.btn-main(href="#" @click.prevent="changeNameDescOrder()") 
              | 지역명순
              font-awesome-icon.ml-2(:icon="nameDescOrder ? 'chevron-down' : 'chevron-up'")
            button.btn-main(href="#" @click.prevent="changeHealthValueDescOrder()") 
              | {{filterToggle.health ? "대기건강지수" : "초과사망자수"}}
              font-awesome-icon.ml-2(:icon="healthValueDescOrder ? 'chevron-down' : 'chevron-up'")
        .table-wrapper
          .table-row(v-for="d in selectedDistricts")
            .left
              p.mb-0 {{d.SGG_NM}}
            .right.text-right
              .stepBoxWrapper(v-if="filterToggle.health")
                .stepBox(:class="{'step-1 step' : 1 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-2 step' : 2 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-3 step' : 3 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-4 step' : 4 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-5 step' : 5 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-6 step' : 6 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-7 step' : 7 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-8 step' : 8 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-9 step' : 9 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-10 step' : 10 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                .stepBox(:class="{'step-11 step' : 11 <= Math.ceil((d[selected.date] <= 0 ? 1 : d[selected.date]))}")
                p.label.mb-0 {{d[selected.date] | index_total_PM10_filter}}
              p.mb-0.overall-death(v-else) {{Math.floor(d[selected.date])}}
              

</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
  components: {
      Loading,
  },
  data() {
    return {
      isLoading: false,
      selectedDistricts: [
      ],
      filterToggle: {
        overallDeath: false,
        health: true,  
      },
      selected: {
        SD_CD: null,
        SGG_CD: null,
        date: "2mth_avg"
      },
      options: {
        sgg: [],
        sd: [
          {value: null, text: "전국"},
          {value: "11", text: "서울특별시"},
          {value: "21", text: "부산광역시"},
          {value: "22", text: "대구광역시"},
          {value: "23", text: "인천광역시"},
          {value: "24", text: "광주광역시"},
          {value: "25", text: "대전광역시"},
          {value: "26", text: "울산광역시"},
          {value: "31", text: "경기도"},
          {value: "32", text: "강원도"},
          {value: "33", text: "충청북도"},
          {value: "34", text: "충청남도"},
          {value: "35", text: "전라북도"},
          {value: "36", text: "전라남도"},
          {value: "37", text: "경상북도"},
          {value: "38", text: "경상남도"},
          {value: "39", text: "제주특별자치도"},
        ],
        date: [
          {value: "1mth_avg", text: "1월 평균"},
          {value: "2mth_avg", text: "2월 평균"},
          {value: "3mth_avg", text: "3월 평균"},
          {value: "4mth_avg", text: "4월 평균"},
          {value: "5mth_avg", text: "5월 평균"},
          {value: "6mth_avg", text: "6월 평균"},
          {value: "7mth_avg", text: "7월 평균"},
          {value: "8mth_avg", text: "8월 평균"},
          {value: "9mth_avg", text: "9월 평균"},
          {value: "10mth_avg", text: "10월 평균"},
          {value: "11mth_avg", text: "11월 평균"},
          {value: "12mth_avg", text: "12월 평균"},
        ]
      },
      nameDescOrder: false,
      healthValueDescOrder: true
    }
  },
  mounted() {
    this.isLoading = true;
    this.getIndexTotalPm10Data(null,`-${this.selected.date}`);
  },
  methods: {
    changeNameDescOrder() {
      this.nameDescOrder = !this.nameDescOrder;
      const sort = this.nameDescOrder ? "-SGG_NM" : "SGG_NM";
      if(this.filterToggle.health) return this.getIndexTotalPm10Data(null,sort);
      else return this.getOverallDeathData(null, sort);
      // if(this.selected.SD_CD) this.getIndexTotalPm10SggData(this.selected.SD_CD,sort);
      // else this.getIndexTotalPm10SdData(sort);
    },
    changeHealthValueDescOrder() {
      this.healthValueDescOrder = !this.healthValueDescOrder;
      const sort = this.healthValueDescOrder ? `-${this.selected.date}` : this.selected.date;
      // const sort = [this.selected.date, this.healthValueDescOrder ? -1 : 1];
      // let sort = {}
      // sort[this.selected.date] = this.healthValueDescOrder ? -1 : 1;
      
      if(this.filterToggle.health) return this.getIndexTotalPm10Data(null,sort);
      else return this.getOverallDeathData(null, sort);
      
      // if(this.selected.SD_CD) this.getIndexTotalPm10SggData(this.selected.SD_CD,sort);
      // else this.getIndexTotalPm10SdData(sort)
    },
    changeFilterValue() {
      this.filterToggle.overallDeath = !this.filterToggle.overallDeath;
      this.filterToggle.health = !this.filterToggle.health;
    },
    onIndexTotalPm10Toggle(evt, sort) {
      this.filterToggle.overallDeath = false;
      this.filterToggle.health = true;
      this.getIndexTotalPm10Data(evt, sort)
    },
    // getIndexTotalPm10SdData(sort) {
    //   this.axios.get('/index_total_pm10/sd', {params: {date: this.selected.date, sort}})
    //     .then(res=> {
    //       this.selectedDistricts = res.data.results;
    //     })
    //     .catch(err=>console.log("err : ", err))
    // },
    // getIndexTotalPm10SggData(evt,sort) {
    //   this.axios.get('/index_total_pm10/sgg', {params: {SD_CD: evt.target.value, date: this.selected.date, sort}})
    //     .then(res=> {
    //       this.selectedDistricts = res.data.results;
    //     })
    //     .catch(err=>console.log("err : ", err))
    // },
    getIndexTotalPm10Data(evt, sort) {
      const District = this.selected.SD_CD ? "sgg" : "sd";
      console.log("this.selected.date : ", this.selected.date)
      this.axios.get('/index_total_pm10/' + District, {params: {SD_CD: this.selected.SD_CD, date: this.selected.date, sort}})
        .then(res=> {
          this.selectedDistricts = res.data.results;
          this.isLoading = false;
        })
        .catch(err=>{
          console.log("err : ", err)
          this.isLoading = false;
        })
    },
    getDataByDate(evt) {
      this.isLoading = true;
      this.selected.date = evt ? evt.target.value : null
      if(this.filterToggle.health) return this.onIndexTotalPm10Toggle(evt);
      else return this.onOverallDeathToggle(evt);
    },
    getDataBySD_CD(evt) {
      this.isLoading = true;
      this.selected.SD_CD = evt ? evt.target.value : null
      if(this.filterToggle.health) return this.onIndexTotalPm10Toggle(evt);
      else return this.onOverallDeathToggle(evt);
    },
    onOverallDeathToggle(evt, sort) {
      this.filterToggle.overallDeath = true;
      this.filterToggle.health = false;
      this.getOverallDeathData(evt, `-${this.selected.date}`)
    },
    getOverallDeathData(evt, sort) {
      const District = this.selected.SD_CD ? "sgg" : "sd";
      this.axios.get('/overall_death/' + District + "/raw", {params: {SD_CD: this.selected.SD_CD, date: this.selected.date, sort}})
        .then(res=> {
          this.selectedDistricts = res.data.results;
          this.isLoading = false;
        })
        .catch(err=>{
          console.log("err : ", err)
          this.isLoading = false;
        })
    }
    // getIndexTotalPm10SggDataByDate(evt) {
    //   this.axios.get('/index_total_pm10/sgg', {params: {SD_CD: this.selected.SD_CD, date: evt.target.value}})
    //     .then(res=> {
    //       this.selectedDistricts = res.data.results;
    //     })
    //     .catch(err=>console.log("err : ", err))
    // }
  },
  filters: {
    index_total_PM10_filter: (value) => {
      if(!value) return ""
      else if(Math.ceil(value) > 10) return "10+"
      else if(Math.ceil(value) == 0) return "1"
      else return Math.ceil(value) 
    },
  }
}
</script>
<style lang="scss" scoped>
  .content-wrapper {
    margin: 0px 15% 150px 15%;
    padding-top: 47px;
    .main-title {
      margin-top: 95px;
      margin-bottom: 75px;
    }
    
    .district-search-box-wrapper {
      margin: 0px;
      padding: 10% 15%;
      background-color: rgb(245,246,251);
      .input-group {
        width: 75%;
        display: inline-flex;
        margin-right: 5%;
        input {
          border-radius: 0px !important;
          height: 50px;
          font-size: 16px;
        }
      }
      .form-group {
        display: inline-block;
        margin-bottom: 0px;
        select {
          display: inline-block;
          width: 170px;
          height: 50px;
          border-radius: 0px;
          margin-right: 20px;
        }
      }
      .input-group-append {
        button {
          height: 50px;
          width: 50px;
          border: 0px;
          border-radius: 0px !important;
          font-size: 18px;
          i {
            vertical-align: text-top;
          }
        }
      }
    }
    .table-box {
      margin-top: 60px;
      .filter-wrapper {
        margin-bottom: 20px;
        .left {
          display: inline-block;
          width: 50%;
          margin-bottom: 20px;
          button:first-child {
            border-right: 0px !important;
          }
        }
        .right {
          display: inline-block;
          width: 50%;
          text-align: right;

          button:first-child {
            border-right: 0px !important;
          }
          .form-group {
            display: inline-block;
            width: 150px;
            margin:0px;
            select {
              height: 50px;
            }
          }
        }
      }
    }
    .table-wrapper {
      border-top: 1px solid black;
      margin-bottom: 50px;
      .table-row {
        font-size: 20px;
        padding: 18px 38px;
        border-bottom: 1px solid silver;
        .left, .right {
          display:inline-block;
          width: 50%;
        }
        .stepBoxWrapper {
          width: 100%;
          max-width: 300px;
          .stepBox {
            height: 15px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 28px;
    }
    .content-wrapper {
      margin: 0px 5%;
      .main-title {
        margin-top: 45px;
        margin-bottom: 45px;
      }
      .district-search-box-wrapper {
        margin: 0px;
        padding: 5% 7%;
        background-color: rgb(245,246,251);
        .input-group {
          width: 75%;
          display: inline-flex;
          margin-right: 5%;
          input {
            border-radius: 0px !important;
            height: 50px;
            font-size: 16px;
          }
        }
        .form-group {
          display: inline-block;
          margin-bottom: 0px;
          width: 100%;
          select {
            display: inline-block;
            width: 49%;
            height: 50px;
            border-radius: 0px;
            &:first-child {
              margin-right: 2%;
            }
            &:last-child {
              margin-right: 0px;
            }
          }
        }
        .input-group-append {
          button {
            height: 50px;
            width: 50px;
            border: 0px;
            border-radius: 0px !important;
            font-size: 18px;
            i {
              vertical-align: text-top;
            }
          }
        }
      }
      .table-box {
        margin-top: 45px;
        .filter-wrapper {
          margin-bottom: 20px;
          .left {
            display: block;
            width: 100%;
            button.btn-main {
              width: 50%;
              display: inline-block;
              padding: 10px 0px;
            }
          }
          .right {
            display: block;
            width: 100%;
            button.btn-main {
              width: 50%;
              display: inline-block;
              padding: 10px 0px;
            }
            .form-group {
              display: inline-block;
              width: 150px;
              margin:0px;
              select {
                height: 50px;
              }
            }
          }
        }
      }
      .table-wrapper {
        border-top: 1px solid black;
        margin-bottom: 50px;
        .table-row {
          font-size: 18px;
          padding: 30px 38px;
          border-bottom: 1px solid silver;
          .left, .right {
            display:inline-block;
            width: 50%;
          }
          .stepBoxWrapper {
            width: 100%;
            max-width: 300px;
            .stepBox {
              height: 15px;
            }
          }
        }
      }
    }
  }
</style>
