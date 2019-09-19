<template lang="pug">
  div
    .page-titl-with-btn-wrapper
      p.page-sub-title 데이터정보
      h2.page-title 미세먼지 건강지도 안내
    .mi-search-box
      
      form.form-inline.mi-top-sorting
        .form-group.mi-form-group
          label.mi-label(for="exampleFormControlSelect1") 지역
          b-form-select#exampleFormControlSelect1.form-control.mi-input.mi-top-input.mb-0(v-model="selected.SD_CD" :options="options.sd" @change.native="setSD")
          
        .form-group.mi-form-group.mi-form-group--last
          label.sr-only(for="exampleFormControlSelect2") 구
          b-form-select#exampleFormControlSelect2.form-control.mi-input.mi-top-input.mb-0(v-model="selected.SGG_CD" :options="options.sgg"  @change.native="setSGG")
            option( slot="first" :value="null" disabled) 시군구
    .mi-chart.mt-5
      #LineChart
</template>

<style lang="scss">
  @import 'billboard.js/dist/theme/insight.min.css';
  .mi-chart {
    padding: 3rem 2.2rem;
    border: 1.5px solid #f2f3f5;
  }

  @media (max-width: 767px){
    .mi-chart {
      padding: 1rem 0.5rem;
      border: 1.5px solid #f2f3f5;
    }
  }
</style>


<script>
import {bb} from 'billboard.js';

export default {
  data () {
    return {
      datacollection: null,
      selected: {
        SD_CD: "11000",
        SGG_CD: null,
      },
      options: {
        sgg: [],
        sd: [
          {value: "11000", text: "서울시"},
          {value: "21000", text: "부산시"},
          {value: "22000", text: "대구시"},
          {value: "23000", text: "인천시"},
          {value: "24000", text: "광주시"},
          {value: "25000", text: "대전시"},
          {value: "26000", text: "울산시"},
          {value: "31000", text: "경기도"},
          {value: "32000", text: "강원도"},
          {value: "33000", text: "충청북도"},
          {value: "34000", text: "충청남도"},
          {value: "35000", text: "전라북도"},
          {value: "36000", text: "전라남도"},
          {value: "37000", text: "경상북도"},
          {value: "38000", text: "경상남도"},
          {value: "39000", text: "제주도"},
        ],
      }
    }
  },
  mounted () {
    this.setSD()
  },
  methods: {
    setSD(evt) {
      if(evt) this.selected.SD_CD = evt.target.value;
      this.selected.SGG_CD = null
      this.axios
          .get("/districts/list", {params: {SD_CD: this.selected.SD_CD.split("000")[0]}})
          .then(res => {
            this.options.sgg = res.data.result.map(r => {return {value: r.SGG_CD, text: r.SGG_NM}});
            this.getData(this.selected.SD_CD, "sd")
          })
          .catch(err => {
            console.log('error : ', err)
          })
    },
    setSGG(evt) {
      this.selected.SGG_CD = evt.target.value;
      this.getData(this.selected.SGG_CD, "sgg")
    },
    getData (cd, district) {
      this.axios
          .get("/chart/" + district, {params: {SGG_CD: cd}})
          .then(res=> {
            const pm25 = res.data.result.pm25
            const od = res.data.result.od
            this.drawChart(pm25, od);
          })
          .catch(err => {
            console.log('err : ', err)
          })
    },
    drawChart(pm25, od) {
      const color = {data1: "#aad9f4", data2: "#c9c3e6"}
      var chart = bb.generate({
        data: {
          colors: {
            "PM2.5": color.data1,
            "초과사망자수": color.data2
          },
          columns: [
            ["PM2.5", ...pm25],
            ["초과사망자수", ...od]
          ]
        },
        axis: {
          x: {
            type: "category",
            categories: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
          },
          // y: {
          //   label: "발생분율(%)",
          //   // max: 100,
          //   padding: {
          //     top: 10,
          //     bottom: 0
          //   }
          // }
        },
        tooltip: {
          contents(c) {
            return `<table class="bb-tooltip">
                      <tbody>
                        <tr>
                          <th colspan="2">${c[0].x + 1}월</th>
                        </tr>
                        <tr class="bb-tooltip-name-PM2-5">
                          <td class="name">
                            <span style="background-color:${color.data1}"></span>PM2.5
                          </td>
                          <td class="value">${c[0].value}㎍/㎥</td>
                        </tr>
                        <tr class="bb-tooltip-name-초과사망자수">
                          <td class="name">
                            <span style="background-color:${color.data2}"></span>초과사망자수
                          </td>
                          <td class="value">${c[1].value}명</td>
                        </tr>
                      </tbody>
                    </table>`
          }
        },
        bindto: "#LineChart"
      });
    }
  }

}
</script>
