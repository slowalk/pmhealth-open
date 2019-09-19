<template lang="pug">    
  div.mapRemake
    main-nav
    //- .bg-cancel(:class="{hide: bgCancel}" @click="bgCancel = false")
    .loading-parent
      loading(:active.sync="isLoading" 
              :can-cancel="false"
              :is-full-page="true")
    .main-modal
      b-modal(ref="myModalRef" size="md" centered @hidden="initSdMap()" :hide-footer="true")
        template(slot="modal-header")
          .d-block.main-modal-header
            font-awesome-icon.cancelBtn(icon="times" color="silver" @click="hideModal()")
        .content
          b-row
            b-col
              p.subtitle.pb-0.pt-0 미세먼지 지도정보
              h3.mb-5
                | 내 지역의 미세먼지가
                br
                | 건강에 미치는 영향은 어느 정도일까?
          b-row
            b-col(cols="12" md="12")
              p.mb-3
                | ‘삼한사미’라고 들어보셨나요? ‘3일은 추위, 4일은 미세먼지가 기승을 부른다’라는 신조어입니다. ‘삼한사미’란 신조어가 나올 만큼 미세먼지에 대한 국민들의 관심이 뜨겁습니다. ‘미세먼지 건강영향지도’는 미세먼지에 의한 건강피해 규모를 예측하고 미세먼지 농도 수준에 따른 건강피해 예방과 대책 수립을 목적으로 제작되었습니다. 연구·개발자뿐만 아니라 일반 국민 분들께서도 접속 지역 혹은 관심 지역에서의 미세먼지로 인한 건강영향을 확인하실 수 있습니다. 
              p 
                | 사용하시면서 문의사항이나 의견이 있으실 경우에는 아래 이메일로 연락 부탁드립니다.
                br
                | AQHIKOREA@gmail.com
        //- template(slot="modal-footer")
          //- b-btn(size="sm" class="float-right" @click="hideModal()") 닫기
    
        
    // 시도 선택시 시군구 리스트 툴팁
    .selectedDistrictsTooltip(ref="selectedDistrictsTooltip" :class="{hide: selectedDistricts.length == 0}")
      .tooltip-cancel-btn(@click="cancelDetail()")
        img(src="https://img.icons8.com/material/24/000000/delete-sign.png")
      .item(v-for="d in selectedDistricts" )
        a(href="#" v-if="selectedDistricts.length > 0" @click.prevent="goToLocation(d.SGG_CD)")
          p.mb-0.badge-district.text-center(:style="d.SGG_NM.length >= 6 ? 'font-size: x-small;padding:5px;' : ''") {{d.SGG_NM}}
          //- .badge-district.text-center(v-if="d.SGG_NM.split(' ').length == 1") {{d.SGG_NM}}
          //- .badge-district.text-center(v-else) 
          //-   | {{d.SGG_NM.split(' ')[0]}}
          //-   br
          //-   | {{d.SGG_NM.split(' ')[1]}}
          .stepBoxWrapper
            //- .stepBox(v-for="i in [1,2,3,4,5,6,7,8,9,10,11].splice(0,Math.ceil((d[date] <= 0 ? 1 : d[date])))")
            //-   .step(:class="'step-' + i")
            .stepBox(:class="{'step-1 step' : 1 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-2 step' : 2 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-3 step' : 3 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-4 step' : 4 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-5 step' : 5 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-6 step' : 6 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-7 step' : 7 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-8 step' : 8 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-9 step' : 9 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-10 step' : 10 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            .stepBox(:class="{'step-11 step' : 11 <= Math.ceil((d[date] <= 0 ? 1 : d[date]))}")
            p.label.mb-0 {{d[date] | index_total_PM10_filter}}
              //- .text-center
                p.mb-2 {{i | index_total_PM10_filter}}
    .left-side-bar
      .non-selected-left-bar
        .real-time-info-box
          .info-left-box
            .label-wrapper
              p.label.mb-0 실시간 미세먼지 농도
            p.district-name.mb-0 {{realTimeData.district_nm}}
          .info-right-box
            .pollution-box
              p.label.mb-0 
                | PM
                sub 2.5
              p.value.mb-0
                b {{realTimeData.pm2_5}} ㎍/㎥
            .pollution-box
              p.label.mb-0 
                | PM
                sub 10
              p.value.mb-0
                b {{realTimeData.pm10}} ㎍/㎥
            .pollution-box
              p.label.mb-0 
                | No
                sub 2
              p.value.mb-0
                b {{realTimeData.no2}} ppm
        .district-search-box-wrapper
          .input-group
            input.form-control.searchBox.main-border-color(style='padding: 0.26rem;padding-left: 0.6rem;' type="text" class="form-control" placeholder="원하시는 지역의 대기건강지수를 알아보세요!" v-model="searchQuery" @keyup.enter.prevent="searchLocation()" @keyup.esc="searchList=null")
            //- img.seachCancelBtn(src="https://img.icons8.com/ios/50/000000/cancel.png" v-bind:class="{hide: searchQuery == null}" @click="searchQuery = null; searchList=null;")
            .input-group-append(style="display: inline-block;")
              button.btn.btn-secondary.main-bg-color.searchBtn(type="submit" @click.prevent="searchLocation()"  @blur="searchList=null")
                i.fa.fa-search
        .searchList(v-if='searchList')
          a.searchList-item.searchList-item-action(href="#" @click.prevent="goToLocation(sl.SGG_CD)" v-for='sl in searchList') 
            font-awesome-icon.mr-2(icon="search" color="gray")
            | {{sl.SD_NM}} {{sl.SGG_NM == sl.SD_NM ? "" : sl.SGG_NM}}
        .btn-district-wrapper.text-center(:class="{hide: sideMenu}")
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('11000')") 서울특별시 
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('21000')") 부산특별시
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('22000')") 대구광역시
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('23000')") 인천광역시
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('24000')") 광주광역시
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('25000')") 대전광역시
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('26000')") 울산광역시
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('29000')") 세종특별자치시
          b-button.btn-district.mt-2(size="sm" @click.prevent="goToLocation('39000')") 제주특별자치도
          //-  :class="{active: targetLocation && targetLocation.SIDO_CD == '23'}"
          
      // 해당지역 정보창
      .selected-left-bar.dp-none-mobile(:class="{hide: !sideMenu}")
        
        .right-tool-btn-wrapper
          button.cancelDetail(@click="cancelDetail()" v-if="targetLocation != null")
            img(src="https://img.icons8.com/material/24/000000/delete-sign.png")
          button.detail(class="btn detail-control-btn" @click="onToggleRightSideBar()" v-if="!viewDetail") 
            span 상세보기 
            img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png")
          button.detail(class="btn detail-control-btn" @click="viewDetail = false" v-else) 
            img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png")
            span 
              | &nbsp;간략히 보기 
        
        .data-list-item
          div(v-if="targetLocation")
            span.district_label {{targetLocation.SIDO_NM || sggCDtoSdCD}} {{targetLocation.sigungu_nm}}
            .dataListWrapper.mt-3
              .dataList
                p.main-label.mb-0
                  b 월평균 미세먼지농도
                //- p.mb-0
                  b
                    | PM
                    sub.underText 2.5
                    |  = 
                    span {{ Math.floor(targetLocation.PM2_5) }}
                    span {{'PM2_5' | unitText}}
          .legendWrapper
            //- div(v-bind:class="{ dpOff : !airPolToggle}")
            //- p.mb-0.legendInfo
              small
                b (단위 : {{airPolTopic | unitText}})
            svg#airpolLegend
        //- .data-list-item(v-if="targetLocation")
        .data-list-item
          .dataListWrapper
            .dataList
              p.main-label
                b 대기건강지수
              air-health-effect(:target-location="targetLocation" ref="leftMenu" :target-id="'leftMenu'" :on-dot="true")

        //- .data-list-item
          .dataListWrapper
            .dataList.text-center
              button(class="btn detail-control-btn" @click="onToggleRightSideBar()" v-if="!viewDetail") 상세보기 >
              button(class="btn detail-control-btn" @click="viewDetail = false" v-else) 간략히 보기 <
        .data-list-item
          .dataListWrapper
            .dataList
              p.main-label.mb-3
                b 미세먼지 행동요령
              .menual-table-wrapper
                menual-table
              //- table.table.menual-table
              //-   thead
              //-     tr
              //-       th.main-title AQHI
              //-       th 
              //-         img(src="../assets/breath.png")
              //-         p.img-subtitle
              //-           | 심뇌혈관/호흡기
              //-           br 
              //-           | 질환자
              //-       th 
              //-         img(src="../assets/person.png")
              //-         p.img-subtitle 
              //-           | 영유아/학생/
              //-           br
              //-           | 어르신
              //-       th 
              //-         img(src="../assets/foreign_worker.png")
              //-         p.img-subtitle.mt-2 야외 근로자
              //-       th 
              //-         img(src="../assets/nomal.png")
              //-         p.img-subtitle.mt-2 일반 국민
              //-   tbody
              //-     tr
              //-       td 
              //-         p.mb-0 
              //-           | 낮음
              //-           br
              //-           | (1~3)
              //-         .stepBox
              //-           .step.step-1
              //-           .step.step-2
              //-           .step.step-3
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-     tr
              //-       td 
              //-         p.mb-0 
              //-           | 보통
              //-           br
              //-           | (4~6)
              //-         .stepBox
              //-           .step.step-4
              //-           .step.step-5
              //-           .step.step-6
              //-       td 실외활동 시 특별히 행동에 제약을 받지는 않지만 몸 상태에 따라 유의하여 활동하세요
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-     tr
              //-       td 
              //-         p.mb-0 
              //-           | 눂음
              //-           br
              //-           | (7)
              //-         .stepBox
              //-           .step.step-7
              //-       td 장시간 또는 무리한 실외활동을 줄이세요. 해야 한다면 의사와 상의하세요.
              //-       td 장시간 또는 무리한 실외활동을 줄이세요.
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-       td 특별히 행동에 제약을 받지 않습니다.
              //-     tr
              //-       td 
              //-         p.mb-0 
              //-           | 매우
              //-           br
              //-           | 눂음
              //-           br
              //-           | (8~10)
              //-         .stepBox
              //-           .step.step-8
              //-           .step.step-9
              //-           .step.step-10
              //-       td 가급적 실내활동을 하세요. 실외활동을 최소화하세요.
              //-       td 가급적 실내활동을 하시고 장시간 또는 무리한 실외활동을 최소화하세요.
              //-       td 장시간 또는 무리한 실외활동을 줄이세요.
              //-       td 장시간 또는 무리한 실외활동을 줄이세요.
              //-     tr
              //-       td 
              //-         p.mb-0
              //-           | 심각
              //-           br
              //-           | (10+)
              //-         .stepBox
              //-           .step.step-11
              //-       td 최대한 실외 활동을 피하세요.
              //-       td 가급적 실내활동을 하시고 최대한 실외활동을 피하세요.
              //-       td 장시간 또는 무리한 실외활동을 줄이세요.
              //-       td 장시간 또는 무리한 실외활동을 줄이세요.

    .right-side-bar(:class="{hide: !viewDetail}")
      button.mb-5(class="btn detail-control-btn" @click="viewDetail = false") 
        img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png")
        span 
          | &nbsp;간략히 보기 
        
      .data-item
        p.mb-2.title 
          b 월평균 미세먼지 농도
        p.mb-3 1월부터 12월까지의 우리 지역 각 월별 미세먼지농도 평균을 보여줍니다.
        p.value(v-if="targetLocation")
          b {{Math.floor(targetLocation.PM2_5)}}㎍/㎥
        
        .graph-wrapper
          .legend-wrapper 
            .color-box 
            p 
              | PM&nbsp;
              sub 2.5
              | &nbsp;㎍/㎥
          #month-dust-average-graph 
      .data-item
        p.mb-2.title 
          b 이번달 미세먼지농도 평균
        p.mb-0 우리 지역의 월별 대기건강지수를 보여주는 그래프입니다. 대기건강지수로 이번 달 우리 지역의 대기 오염이 단기적 건
      .data-item
        p.mb-2.title 
          b 대기건강지수
        p.mb-2 우리 지역의 월별 대기건강지수를 보여주는 그래프입니다. 대기건강지수로 이번 달 우리 지역의 대기 오염이 단기적 건강위험의 크기를 알 수 있습니다.
        router-link.link(to="/info/how/airhealthindex") 대기건강지수란 무엇인가요?
      .data-item
        p.mb-2 
          b *지역별 건강영향도 순위가 궁금한가요?
        p.mb-2 우리 지역의 대기건강지수를 보여주는 그래프입니다.
        router-link.link(to="/info/how/airhealthindex") 대기건강지수는 어떻게 계산하나요?
        .air-health-effect-wrapper
          air-health-effect(:target-location="targetLocation" ref="rightMenu" :target-id="'rightMenu'" :on-dot="false")
        .graph-wrapper
          .legend-wrapper 
            .color-box 
            p 대기건강지수
          #air-health-effect-graph
      .data-item(v-if="targetLocation")
        p.mb-2.title 
          b 초과사망자수
        p.value.under-line
          b 전체 {{targetLocation.OverallDeath || "-"}}명
        p.mb-2 
          | 미세먼지로 인한 심혈관질환 초과사망자는 
          b {{targetLocation.CerebralBloodVesselOverallDeath || "-"}}명
          | , 호흡기질환 사망자는 
          b {{targetLocation.CerebralBreathOverallDeath || "-"}}명
          | 입니다.
        .img-banner.mb-5
          .left
            .img-item-wrapper
              img(src="../img/heart.png")
            .img-label-wrapper
              p.label 심뇌혈관질환자
              p.value {{targetLocation.CerebralBloodVesselOverallDeath || "-"}}
          .right
            .img-item-wrapper
              img(src="../img/breath.png")
            .img-label-wrapper
              p.label 호흡기 질환자
              p.value {{targetLocation.CerebralBreathOverallDeath || "-"}}
        .jeju-box
          .top.mb-2
            p.mb-0 이번달의 제주도 초과사망자수는 
            p.mb-0.value.main-color {{targetLocation.Jeju_overalldeath ? Math.floor(targetLocation.Jeju_overalldeath*10)/10 : "-"}}
          p.middle.mb-3
            | 제주도만큼 미세먼지 농도가 낮아지면, 매달 
            b N(지역초과사망자수값-제주도초과사망자수값)
            | 명의 사망을 줄일 수 있습니다.
          p.bottom.mb-0
            | 미세먼지 건강영향지수가 
            span.main-color 
              b N
            | 이면, 이렇게 하세요!
    #targetMap
      //- .leftLegend.dp-none-mobile
        img(src="https://img.icons8.com/material-sharp/48/c02b1f/error.png")
        span.title 상대위험도&nbsp;
        span.sign (%)
    
    //- button.toolBtn.border-round(ref="resetBtn" href="#" @click.prevent="setToInitMap()" ) 
      img(src="https://png.icons8.com/android/40/000000/expand.png")
    //- button.toolBtn.border-round(ref="resetBtn" href="#" @click.prevent="setToInitMap()" ) 
    //-   img(src="https://img.icons8.com/ios/30/000000/sorting-options-filled.png")
    .tool-btn-wrapper(ref="userLocationBtn")
      button.toolBtn.bottom-tool-btn(href="#" @click.prevent="setToUserLocation()" ) 
        img(src="https://img.icons8.com/ios-glyphs/30/000000/center-direction.png")


    //- //- 줌 컨트롤러
    //- #zoomControl(ref="zoomControl")

    //- 스위치 
    .tool-btn-wrapper(ref="valueToggleBtn")
      button.toolBtn.top-tool-btn.switchWrapper
        span.label.text-center
          b 미세먼지 농도
        .inputWrapper.text-center
          label.onoffbtn(v-bind:class="{active: airPolToggle}")
            input(type="checkbox" v-bind:class="{active: airPolToggle}" checked @click="toggleFilterSwitch('airpol')")
      //- button.toolBtn.border-round( href="#" @click.prevent="toggleFilter()" ) 
        img(src="https://img.icons8.com/ios/30/000000/sorting-options-filled.png")
      //- .switchWrapper.mt-2(v-if="!isMobile()" v-bind:class="{hide: !filterBtn}")
        .list.pt-1
          span.text-center
            b 미세먼지 농도
          .labelWrapper.text-center
            label.onoffbtn(v-bind:class="{active: airPolToggle}")
              input(type="checkbox" v-bind:class="{active: airPolToggle}" checked @click="toggleFilterSwitch('airpol')")
            
        .list.pt-1
          span.text-center
            b 초과사망자수
          .labelWrapper.text-center
            label.onoffbtn(v-bind:class="{active: addrToggle}")
              input(type="checkbox" v-bind:class="{active: addrToggle}" checked  @click="toggleFilterSwitch('addr')")
    //- .dp-none-mobile(ref="monthPickerControl")
    //-   button.toolBtn(@click.prevent="monthPickerBtn = !monthPickerBtn") 
    //-     //- span.date {{ selected.year != '월 평균' ? selected.year + '년 ' + selected.month + '월' : selected.month + selected.year}}
    //-     span.date {{ selected.month }}월
    //-     img(src="https://img.icons8.com/material/30/000000/sort-down--v1.png" v-bind:class="{rotation: monthPickerBtn}")
    //-   .monthPickerWrapper(v-bind:class="{hide: !monthPickerBtn}")
    //-     //- .select
    //-       //- img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" @click="changeDateFilter('year', -1)")
    //-       span {{selected.year != '월 평균' ? selected.year + '년' : selected.year}}
    //-       //- img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" @click="changeDateFilter('year', 1)")
    //-     .select
    //-       img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" @click="changeDateFilter('month', -1)")
    //-       span {{selected.month}}월
    //-       img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" @click="changeDateFilter('month', 1)")
    .tool-btn-wrapper(ref="monthPickerControl")
      button.toolBtn.top-tool-btn.month-select-btn
        .select
          img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" @click="changeDateFilter('month', -1)")
          span &nbsp;{{selected.month}}월&nbsp;
          img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" @click="changeDateFilter('month', 1)")

</template>

<style lang="scss">
  @import 'billboard.js/dist/theme/insight.min.css';
  @import '../style/map.scss';
  /* IE9, IE10 */
  @media screen and (min-width:0\0) {
    .navbar-brand.logo-text {
      margin-top: -1px !important;
    }
    .navbar .menu {
      margin-top: -1px !important;
    }
    .navbar-nav .input-group {
      display:inline-block;
      .searchBox {
        min-width: 220px !important;
        padding: 0.3rem !important;
      }
    }
    .main-modal {
      .modal-body {
        min-height: 450px;
      }
    }
    .page-wrappers {
      position: absolute;
      display: inline-block;
      right: 0px;
      top: 0px; 
      margin: 8px 10px;
    }
  }
  @media screen and (min-width: 600px) {
    .dp-none-nomobile {
      display: none;
    }
    .input-group.searchBox {
      min-width: 220px !important;
    }
    .navbar .input-group {
      width: 330px !important; 
    }
  }
  .mapRemake {
    .bg-cancel {
      width: 100%;
      height: 100vh;
      position:fixed;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.6);
    }
    #air-health-effect-dot {
      height: 80px;
      width: 100%;
    }
    .detail-control-btn {
      border: 1px solid silver;
      background-color: white !important;
      width: 160px;
      height: 40px;
      vertical-align: middle;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.3);
      .left {
        vertical-align: text-bottom;
        width: 16px;
      }
    }
    .data-list-item {
      padding: 25px 30px 0px 30px;
    }
    .district_label {
      font-weight: 700;
      font-size: 30px;
      line-height: initial;
      display: inline-block;
    }
    .selectedDistrictsTooltipWrapper {
      .stepBoxWrapper {
        width: 215px !important;
        .step {
          height: 10px;
        }
      }
      &:before {
          content: '';
          position: absolute;
          top: 15px;
          left: -20px;
          width: 0;
          height: 0;
          border: 30px solid transparent;
          border-right-color: white;
          border-top: 0px;
          margin-top: -15px;
          margin-left: -30px;
          z-index: 9999;
      }
    }
    .month-select-btn {
      width: 120px;
      img {
        width: 12px;
        height: 12px;
      }
      .left {
        float: left;
        margin-top:3px;
      }
      .right {
        float: right;
        margin-top:3px;
      }
    }
    .real-time-info-box {
      background-color: rgb(245,246,251);
      border: 1px solid rgb(222,226,230);
      margin: 20px;
      padding:30px;
      .info-left-box {
        width: 45%;
        display:inline-block;
        .label-wrapper {
          background-color: rgb(211,229,249);
          border-radius: 5px;
          display: inline-block;
          padding: 3px 8px;
          color: rgb(17,133,240);
          font-size: 14px;
        }
        p.district-name {
          margin-top: 10px;
          font-size: 27px;
        }
      }
      .info-right-box {
        width: 55%;
        display:inline-block;
        text-align: right;
        .pollution-box {
          text-align: left;
          display:inline-block;
          &:first-child {
            padding-left: 0px;
            padding-right: 10px;
            border-right: 1px solid silver;
          }
          &:nth-child(2) {
            padding-left: 10px;
            padding-right: 10px;
            border-right: 1px solid silver;
          }
          &:last-child {
            padding-right: 0px;
            padding-left: 10px;
            border-right: none;
          }
          .label {
            font-size: 14px;
            color: rgb(105,108,125);
          }
          .value {
            font-size: 18px;
          }
        }
      }
    }
    .btn-district-wrapper {
      margin: 0px 20px;
      .btn-district {
        width: 32%;
        border-radius: 0px !important;
        height: 50px;
        display: inline-block;
        background-color: white;
        color: black;
        border: 1px solid silver;
        margin-right: 2%;
        margin-top: 0px !important;
        margin-bottom: 10px;
        font-size: 16px;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        &.active {
          color: white;
          border: 0px;
          background-color: rgb(17,133,240);
        }
      }
    }
    .selectedDistrictsTooltip {
      // border: 1px solid rgb(68,68,68);
      position: absolute;
      // top:0px;
      width:370px;
      border-radius: 10px;
      z-index: 999;
      background-color: white;
      max-height: 465px;
      overflow-y: scroll;
      padding: 50px 20px 20px 20px;
      .tooltip-cancel-btn {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0px;
        padding: 10px;
        img {
          border-radius: 50%;
          border: 1px solid silver;
          padding: 4px;
          width: 24px;
        }
      }
      .item {
        margin-bottom: 5px;
        .badge-district {
          width: 90px;
          height: 22px;
          vertical-align: middle;
          margin-right: 10px;
          border-radius: 5px;
          font-size: 14px;
          line-height: normal;
          background-color: rgb(66,67,75);
          color: white;
          display: inline-block;
          padding: 2px 5px; 
          vertical-align: middle;
        }
      }
    }
    .left-side-bar {
      margin-top:47px;
      display: inline-block;
      position: relative;
      width: 600px;
      height: calc(100vh - 47px);
      vertical-align: top;
      overflow-y: scroll;
    }
    .right-side-bar {
      margin-top:47px;
      padding: 20px 30px;
      display: inline-block;
      background-color: rgb(245,246,251);
      width: calc(100% - 600px);
      height: calc(100vh - 47px);
      vertical-align: top;
      overflow-y: scroll;
      position: fixed;
      z-index: 10;
      .data-item {
        font-size: 14px;
        margin-bottom: 40px;
        & > .title {
          font-size: 18px;
        }
        & > .value {
          margin-bottom: 30px;
          font-size: 28px;
          color: rgb(17,133,240);
          &.under-line b {
            border-bottom: 1px solid black;
            padding-bottom: 5px;
            border-bottom: 1px solid black;
          }
        }
        & > .link {
          padding: 3px;
          border-bottom: 1px solid rgb(17,133,240);
          &:hover {
            text-decoration: none !important;
          }
        }
        #month-dust-average-graph {
          background-color: white;
          width: 100%;
          svg {
            width: 100%;
          }
        }
        .graph-wrapper {
          text-align: center;
          margin-top: 25px;
          padding: 20px 0px;
          background-color: white;
          .legend-wrapper {
            z-index: 10;
            position: relative;
            margin-bottom: -30px;
            p {
              display: inline-block;
              font-size: 12px;
              vertical-align: middle;
              margin-bottom: 0px;
            }
            .color-box {
              width: 10px;
              height: 10px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 8px;
              background-color: rgb(0, 199, 60);
            }
          }
        }
        #air-health-effect-graph  {
          width: 100%;
          overflow-x: auto;
        }
        .img-banner {
          .left, .right {
            display: inline-block;
            width: 50%;
          }
          .img-item-wrapper {
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            width: 65px;
            height: 65px;
            padding: 13px 0px;
            text-align:center;
            margin-right: 10px;
            background-color: white;
            img {
              height: 100%;
              vertical-align: middle;
              margin:auto;
            }
          }
          .img-label-wrapper {
            display: inline-block;
            margin-top: 30px;
            bottom: 30px;
            p {
              display: inline-block;
              font-size: 18px;
              &.label {
                width: 120px;
              }
              &.value {
                font-weight: 600;
                color: rgb(17,133,240);
              }
            } 
          }
        }
        .jeju-box {
          padding: 25px;
          border: 1px solid silver;
          background-color: white;
          background-image: url("../img/jeju.png");
          background-position: right;
          background-repeat: no-repeat;
          background-size: cover;
          .top {
            font-weight: 800;
            font-size: 16px;
            p {
              display: inline-block;
            }
            .value {
              margin-left: 7px;
            }
            .main-color {
              font-size: 18px;
            }
          }
        }
      }
      .air-health-effect-wrapper {
        margin-top: 30px !important;
        .step {
          height: 20px !important;
        }
      }
    }
    #targetMap {
      margin-top:47px;
      display: inline-block;
      position: fixed !important;
      width: calc(100% - 600px);
      height: calc(100vh - 47px);
      svg { 
        background-color: none !important;
      }
    }
    .air-health-effect-wrapper {
      .stepBoxWrapper {
        line-height: inherit !important;
        .stepBox {
          width: 9% !important;
          font-size: 13px !important;
          display: inline-block !important;
          border: none !important;
          .step {
            height: 17px !important;
          }
          p {
            margin-top: 5px;
          }
        }
      }
      .step-explain-wrapper {
        font-size:12px;
        margin-top: 5px;
        text-align: center;
        .low-risk {
          display:inline-block;
          width: 27%;
          vertical-align: super;
          border-left: 1px solid silver;
        }
        .mod-risk {
          display:inline-block;
          width: 27%;
          vertical-align: super;
          border-left: 1px solid silver;
        }
        .high-risk {
          display:inline-block;
          width: 9%;
          vertical-align: super;
          border-left: 1px solid silver;
        }
        .very-high-risk { 
          display:inline-block;
          width: 27%;
          vertical-align: super;
          border-left: 1px solid silver;
        }
        .serious-high-risk {
          display:inline-block;
          width: 9%;
          vertical-align: super;
          border-left: 1px solid silver;
          border-right: 1px solid silver;
        }
      }
    }

    .seachCancelBtn {
      width: 20px;
      position: absolute;
      right: 50px;
      top: 8px;
      cursor:pointer;
      z-index: 100;
    }

    .switchWrapper {
      .label {
        margin-right: 7px;
      }
      // &:after {
      //   top: -5px;
      //   content: '';
      //   position: absolute;
      //   border-bottom: 7px solid white;
      //   border-right: 8px solid transparent;
      //   border-left: 8px solid transparent;
      //   right: 4px;
      // }
      p {
        display: inline-block;
        vertical-align: top; 
        width: 50%
      }
      .list {
        padding: 7px 15px;
        border-bottom: 1px solid silver;
        span {
          vertical-align: middle;
        }
      }
      .inputWrapper{
        float: right;
        .onoffbtn{
          // margin-top: 5px;
          width: 35px;
          height: 20px;
          border-radius:15px;
          // background: #bbbbbb none repeat scroll 0 0;
          background: white none repeat scroll 0 0;
          border: 1px solid rgb(192,43,31);
          display:block;
          position:relative;
          margin-bottom: 0px;
          cursor: pointer;
          &.active {
            border:1px solid rgb(66, 177, 59);
            -moz-transition: all 0.3s ease-in 0s;
            -webkit-transition: all 0.3s ease-in 0s;
            -o-transition: all 0.3s ease-in 0s;
            transition: all 0.3s ease-in 0s;
          }
        }
        .onoffbtn:after{
          position:absolute;
          height: 16px;
          width: 16px;
          display:block;
          border-radius:50%;
          background:rgb(192,43,31);
          top:1px;
          left:1px;
          content:'';
          -webkit-transition: all 200ms ease-in-out;
          -moz-transition: all 200ms ease-in-out;
          -o-transition: all 200ms ease-in-out;
          transition: all 200ms ease-in-out;
          text-align:center;
          line-height:29px;
          color:#fff;
          font-size:12px;
        }
        .onoffbtn.active:after{
          left:90%;
          margin-left:-14px;
          background-color: rgb(66, 177, 59);
          // content:'on';
          input {
            border: 1px solid rgb(66, 177, 59);
          }
        }
        .onoffbtn input[type="checkbox"]{
          opacity:0;
          cursor: pointer;
        }

        .onoffswitch-inner:after {
          content: "";
          padding-right: 10px;
          // background-color: #bbbbbb;
          color: #999999;
          text-align: right;
          border-radius: 0 19px 19px 0;
        }

        .onoffswitch-switch {
          width: 19px;
          margin: 0px;
          background: #FFFFFF;
          border: 1px solid #999999;
          border-radius: 19px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 20px;
          -moz-transition: all 0.3s ease-in 0s;
          -webkit-transition: all 0.3s ease-in 0s;
          -o-transition: all 0.3s ease-in 0s;
          transition: all 0.3s ease-in 0s;
          background-image: -moz-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
          background-image: -webkit-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
          background-image: -o-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
          background-image: linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
          box-shadow: 0 1px 1px white inset;
        }

        .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
          margin-left: 0;
        }

        .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
          right: 0px;
        }
      }
    }
    .dpOff {
      display:none;
    }
    .notSelected {
      font-size: 15px;
      padding: 5px 10px;
      font-weight: 600;
    }
    .modal-backdrop.show {
      opacity: 0.15 !important;
    }
    .main-modal {
      .modal-content {
        background-color: rgba(30,30,30,0.9) !important;
        color:white;
      }
      .modal-header {
        padding: 0px !important;
        border-bottom: none !important;
        .main-modal-header {
          padding:20px 30px;
          width: 100%;
          text-align: right;
          .cancelBtn {
            font-size: 25px;
          }
          // background-color: #1c54ae;
          
        } 
      }   
      .content {
        padding-right:1rem;
        padding-left:1rem;
        padding-top:1rem;
        padding-bottom: 70px;
        .subtitle {
          color: #1f88ed;
        }
        p  {
          font-size: 14px;
          margin-bottom: 5px;
        }
        .linkTo {
          font-size: 17px;
          padding: 15px 10px;
        }
        .linkWrapper  {
          border-top:1px solid silver;
          padding: 15px 10px;
          font-size: 15px;
          .item {
            margin-bottom: 15px;
            a {
              text-decoration: none;
              color: silver;
              &:hover {
                color: #1f88ed;
              }
            }
          }
        }
      }
    }
    .monthPickerWrapper {
      margin: 0px 5px;
      background-color: white;
      .select {
        display: block;
        text-align: center;
        margin: auto;
        font-weight: 700;
        font-size: 14px;
        height: inherit !important;
        padding: 5px;
        border: 1px solid;
        border-top: 0px;
        .left {
          float:left;
          cursor: pointer;
        }
        .right {
          cursor: pointer;
          float:right;
        }
        img {
          margin-top: 5px;
          height: 12px;
        }
      }
      select {
        display: block;
        margin: auto;
        font-weight: 700;
        font-size: 14px;
        height: inherit !important;
        padding: 5px;
      }
    }
    .tool-btn-wrapper {
      margin-bottom: 10px;
      .toolBtn {
        font-weight: 700;
        padding: 8px;
        height:40px;
        cursor: pointer;
        background: white;
        font-size: 13px;
        // border: 1px solid black;
        margin-right: 10px;
        border-radius: 5px;
        &.top-tool-btn {
          margin-top: 10px;
        }
        &.bottom-tool-btn{
          img{
            height: 22px;
            width: 22px;
          }
        }
        .date {
          margin-left: 5px;
          margin-right: 10px;
        }
        &.border-round {
          border-radius: 50%;
        }
        img{
          vertical-align: top;
        }
      }
    }
    .searchList {
      margin-top: -20px;
      margin-left: 20px;
      position: absolute;
      background-color: white;
      z-index: 120;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      width: 553px;
      max-height: 300px;
      overflow-y: scroll;
      .searchList-item {
        display: block;
        color: black;
        padding: 10px 15px;
        border-bottom: solid 1px silver;
        &:hover {
          text-decoration: none;
          background-color: rgba(230,230,230,0.8)
        }
      }
    }
    .leftLegend {
      position: absolute;
      // display: inline-block;
      background-color: rgba(255,255,255,0.9);
      z-index: 100;
      margin: 10px;
      padding: 3px 10px 5px 10px;
      img {
        width: 21px;
        vertical-align: middle;
        margin-right: 3px;
      }
      .title {
        font-size: 13px;
        font-weight: 700;
        vertical-align: middle;
      }
      .sign {
        font-size: 13px;
        font-weight: 700;
      }
      &.slideLeft {
        transform: translate(-310px ,0);
        display:none;
      }
    }
    .selected-left-bar {
      // transition: 0.1s;
      // position: absolute;
      // display: inline-block;
      background-color: rgba(255,255,255,0.9);
      z-index: 100;
      // height: calc(100vh - 47px);
      // width: 310px;
      overflow-y: auto;
      .list-group-item {
        padding: 1.7rem 1.25rem !important;
        border: none !important;
        background-color: transparent !important;
        p:hover{
          background-color: transparent !important;
        }
      }
      .right-tool-btn-wrapper {
        margin-right: 30px;
        float: right;
        .detail {
          vertical-align: middle;
        }
        .right {
          vertical-align: text-bottom;
          width: 16px;
        }
      }
      .cancelDetail {
        background: none;
        // position: absolute;
        border: 1px solid silver;
        // right: 0;
        margin: 25px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 10;
        padding-bottom: 5px;
        img {
          width: 18px;
        }
      }
      &.slideLeft {
        transform: translate(-310px ,0);
        display:none;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        &:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
        &.round {
          border-radius: 34px;
          &:before {
            border-radius: 50%;
          }
        }
      }

      .axis path {
        stroke: none;
      }
      .axis line {
        stroke: #000;
      }
      .dataListWrapper {
        .dataList{
          .main-label {
            font-size: 18px;
            margin-bottom: 30px;
          }
          .box {
            display: inline-block;
            width: 50%
          }
          .small {
            font-size:13px;
          }
          .overdeathInfoWrapper {
            p {
              display: inline-block;
            }
            img {
              width: 16px;
              height: 16px;
              margin-left:5px;
              vertical-align: text-bottom;
            }
            .infoBox {
              border-top: 1px solid gray;
              background-color: rgb(221,222,225);
              padding: 15px 10px;
              font-size: 13px;
            }
            .relativeRisk {
              margin-top: 10px;
              .leftBox {
                display: inline-block;
                width:50%;
                .percentage {
                  margin-left: 25px;
                  font-size: 25px; 
                }
                .title {
                  margin-left: 5px;
                  font-size: 15px;
                }
                p {
                  margin: 0px;
                }

              }
              .rightBox {
                position: absolute;
                display: inline-block;
                // width:50%;
                margin-top: -4px;
                label {
                  padding-top: 3px;
                  font-size: 13px;
                }
              }
            }
          }
          .locationInfo {
            .box {
              display: inline-block;
              width: 50%
            }
            p, p small {
              margin: 0px;
              font-weight: 700;
            }
            h4 {
              font-weight: 700;
            }
          }
          p {
            // cursor: pointer;
            // padding: 5px 10px;
            &.topicActive {
              background-color: #2f87ec;
              color: white;
            }
          }
          .addrWrapper {
            font-size: 13px;
            p {
              padding-left: 20px;
            }
          }
        }
      }
      .legendWrapper {
        .legendInfo {
          font-size:12px;
        }
        #airpolLegend {
          height: 90px;
          width:100%;
        }
        #airpolLegend, #addrLegend {
          // width: 100%;
        }
      }
    }

    .airPolDataFilter, .addrDataFilter {
      margin: 10px;
      button {
        background-color: white;
        border: 1px solid silver;
        &:hover {
          background-color: #999;
        }
        cursor: pointer;
        &.active {
          background-color: rgb(47, 135, 236);
          border: 0px;
          color: white;
        }
      }
    }
  }
    
</style>

<script>
import AirHealthEffect from './common/AirHealthEffect';
import MenualTable from './common/MenualTable';
import Loading from 'vue-loading-overlay';

import {bb} from 'billboard.js';

import {codeToSD} from "../models/sdVal.js"

const sdVal = require("../models/sdVal")
const consumer_key = "29b193cec6074f9c8591"
const consumer_secret = "f7bc7a00687a4eae8378"

export default {
  components: {
      Loading,
      AirHealthEffect,
      MenualTable
  },
  data() {
    return {
    //   bgCancel: false,
      goTo: false,
      beforeMarker: null,
      viewDetail: false,
      selectedDistricts: [],
      infoBoxToggle: true,
      menuToggle: false,
      airPolToggle: true,
      addrToggle: true,
      isLoading: false,
      q: '',
      isActive: false,
      majorOptions: [
        "전체",
        "문과대학 국어국문학과",
        "문과대학 사학과",
      ],
      menuOn: false,
      targetLocation: null,
      searchQuery: null,
      searchList: [],
      panToBoundsOptions: { top: 200, right: 0, bottom: 200, left: 500 },
      firstMapLat: 36,
      firstMapLng: 127,
      naverMap: null,
      airPolTopic: "PM2_5",
      addrTopic: "ad",
      airPolD3Linear: null,
      sdAirPolD3Linear: null,
      addrD3Quantize: null,
      sdAddrD3Quantize: null,
      beforeZoom: null,
      zoom: 2,
      d3Legend: null,
      legendBarHeight: 30,
      legendRectBoundsWidth: 0,
      mapOptions: null,
      clickedBeforePath: false,
      getUserLocation: null,
      userLocation: null,
      userLocationMarker: null,
      sggMapData: null,
      groupMapData: null, // 그룹으로 묶인 시군구 - 경기남부/북부, 강남/강북
      sggsWithoutGroupMapData: null, // 그룹으로묶인 시군구 외의 시군구
      sdMapData: null,
      // date: "2015_12",
      Pm2_5Sd: null,
      Pm2_5Sgg: null,
      OverallDeathSd: null,
      OverallDeathSgg: null,
      Pm2_5SdStats: null,
      Pm2_5SggStats: null,
      OverallDeathSdStats: null,
      OverallDeathSggStats: null,
      districtStandard: "sd",
      realTimeData: {
        district: null,
        pm2_5: null,
        pm10: null,
        no2: null
      },
      selected: {
        // year: "2015",
        // month: "1"
        year: "월 평균",
        month: "1"
      },
      options: {
        // year: ['2012','2013','2014','2015', '월 평균'],
        year: ["2015"],
        month: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      },
      monthPickerBtn: false,
      legendDotMarginLeft: 5,
      legendDotMarginTop: 40,
      mapDownloadChecker: {
        sggMap: false,
        sggZoom5: false,
      },
      filterBtn: false,
      whoStandard: false,
      jejuStandard: false,
      sideMenu: false,
      naverMapProj: null,
      zoomChanged: true,
      GetTargetLocationData: [
        "OverallDeath",
        "OverallDeathBeta",
        "PM2_5",
        "SIDO_CD",
        "SIDO_NM",
        "sigungu_cd",
        "sigungu_nm",
        "FemaleOverallDeath",
        "MaleOverallDeath",
        "CerebralBloodVesselOverallDeath",
        "CerebralBreathOverallDeath",
        "Index_total_PM10",
        "Jeju_overalldeath",
      ],
      selectedDistrictsTooltip: new naver.maps.InfoWindow(),
    }
  },
  computed: {
    date: function() {
      if(this.selected.year == '월 평균') return this.selected.month + "mth_avg"
      else return this.selected.year + '_' + this.selected.month
    },
    sggCDtoSdCD: function() {
      const cd = this.targetLocation.sigungu_cd.substring(0,2);
      switch(cd) {
        case "11" : return "서울특별시"
        case "21" : return "부산광역시"
        case "22" : return "대구광역시"
        case "23" : return "인천광역시"
        case "24" : return "광주광역시"
        case "25" : return "대전광역시"
        case "26" : return "울산광역시"
        case "29" : return "세종특별자치시"
        case "31" : return "경기도"
        case "32" : return "강원도"
        case "33" : return "충청북도"
        case "34" : return "충청남도"
        case "35" : return "전라북도"
        case "36" : return "전라남도"
        case "37" : return "경상북도"
        case "38" : return "경상남도"
        case "39" : return "제주특별자치도"
      }
    }
  },
  created() {
    this.initUserLocationMarker();
    this.mapOptions = {
      mapTypeControl: false,
      mapTypeControlOptions: {
          style: naver.maps.MapTypeControlStyle.BUTTON,
          position: naver.maps.Position.TOP_RIGHT
      },
      zoomControl: false,
      // zoomControl: this.isMobile() ? false : true,
      // zoomControlOptions: {
      //     style: naver.maps.ZoomControlStyle.SMALL,
      //     position: naver.maps.Position.TOP_RIGHT,
      // },
      scaleControl: false,
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT
      },
      mapDataControl: false,
      center: new naver.maps.LatLng(this.firstMapLat, this.firstMapLng),
      zoom: this.zoom,
      minZoom: this.zoom,
      disableDoubleTapZoom: true,
      disableDoubleClickZoom: true,
      disableTwoFingerTapZoom: true,
      scrollWheel: false,
    };
    // legend 초기화
    this.legendRectBoundsWidth = 310;
  },
  mounted() {
    this.initSdOpenApiPm2_5("11");
    // set 유저 현위치정보
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.getUserLocation = new naver.maps.LatLng(lat,lng);
      })
    }

    this.showModal();

    this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);
    this.naverMapProj = this.naverMap.getProjection();

    // // 줌 컨트롤 버튼 추가
    // const zoomControl = this.$refs.zoomControl;
    // this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(zoomControl);

    // 시도 선택시 툴팁 초기화
    // this.selectedDistrictsTooltip.setContent(this.$refs.selectedDistrictsTooltip);
    // this.selectedDistrictsTooltip = new naver.maps.InfoWindow(this.naverMap, {
    //   content: this.$refs.selectedDistrictsTooltip,
    //   disableAnchor: true
    // })
    this.selectedDistrictsTooltip.setOptions({
      content: this.$refs.selectedDistrictsTooltip,
      position: {x: 128, y: 37},
      disableAnchor: true
    });

    // 유저위치 컨트롤 버튼 추가
    const userLocationBtn = this.$refs.userLocationBtn;
    this.naverMap.controls[naver.maps.Position.BOTTOM_RIGHT].push(userLocationBtn);

    // 변수 토글 스위치
    const valueToggleBtn = this.$refs.valueToggleBtn;
    if(!this.isMobile()) this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(valueToggleBtn);
    else this.naverMap.controls[naver.maps.Position.BOTTOM_RIGHT].push(valueToggleBtn);

    // month 컨트롤 버튼 추가
    const monthPickerControl = this.$refs.monthPickerControl;
    this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(monthPickerControl);
  },
  filters: {
    district_nm_filter: (t) => {
      if (t == "경상북도") return "경북";
      else if (t == "경상남도") return "경남";
      else if (t == "충청북도") return "충북";
      else if (t == "충청남도") return "충남";
      else if (t == "전라남도") return "전남";
      else if (t == "전라북도") return "전북";
      else return t.substring(0,2);
    },  
    topicUpperText: (value) => {
      if(value == 'PM2_5' || value == 'PM10') return "PM" 
      else if(value == 'NO2') return "NO"
    },
    topicDownText: (value) => {
      if(value == 'PM2_5') return "2.5" 
      else if(value == 'PM10') return "10"
      else if(value == 'NO2') return "2"
    },
    unitText: (value) => {
      if (value == "PM2_5") return "㎍/㎥";
      else if (value == "PM10") return "㎍/㎥";
      else if (value == "NO2") return "ppm";
    },
    index_total_PM10_filter: (value) => {
      if(Math.ceil(value) > 10) return "10+"
      else if(Math.ceil(value) == 0) return "1"
      else return Math.ceil(value) 
    },
    index_total_PM10_for_graph: (value) => {
      if(Math.ceil(value) > 10) return 11
      else if(Math.ceil(value) == 0) return 1
      else return Math.ceil(value) 
    },
    index_total_PM10_for_class_filter: (value) => {
      if(Math.ceil(value) > 10) return "11"
      else if(Math.ceil(value) == 0) return "1"
      else return Math.ceil(value) 
    }
  },
  methods: {
    initSdOpenApiPm2_5(SD_CD) {
      this.realTimeData.district_nm = "-";
      this.realTimeData.pm2_5 = "-";
      this.realTimeData.pm10 = "-";
      this.realTimeData.no2 = "-";
      if(SD_CD) {
        this.axios.get(
          '/openapi/fine_dust/sd',
          {
            params: {SD_CD}
          }
        )
        .then(res => {
          if(!res.data) console.error("res.data is none")
          this.realTimeData.district_nm = res.data.district_nm;
          this.realTimeData.pm2_5 = res.data.pm2_5;
          this.realTimeData.pm10 = res.data.pm10;
          this.realTimeData.no2 = res.data.no2;
        })
      }
    },
    initSggOpenApiPm2_5(districtInfo) {
      this.realTimeData.district_nm = "-";
      this.realTimeData.pm2_5 = "-";
      this.realTimeData.pm10 = "-";
      this.realTimeData.no2 = "-";
      this.axios.get(
        '/openapi/fine_dust/sgg',
        {
          params: districtInfo
        }
      )
      .then(res => {
        if(!res.data) console.error("res.data is none")
        this.realTimeData.district_nm = res.data.district_nm;
        this.realTimeData.pm2_5 = res.data.pm2_5;
        this.realTimeData.pm10 = res.data.pm10;
        this.realTimeData.no2 = res.data.no2;
      })
    },
    onToggleRightSideBar() {
      this.viewDetail = true
      this.onMonthDustAverageGrapth();
      this.onAirHealthEffectGrapth();
      this.$refs.rightMenu.setAirHealthEffect();
      // this.onJejuOverallDeath();
    },
    // onJejuOverallDeath() {
    //   const District = this.targetLocation.sigungu_cd ? "sgg" : "sd"
    //   this.axios
    //       .get(
    //         `/overall_death/${District}/jeju`, 
    //         {
    //           params: 
    //           {
    //             SGG_CD: this.targetLocation.sigungu_cd || (this.targetLocation.SIDO_CD + "000"),
    //             date: this.date
    //           }
    //         }
    //       )
    //       .then(res => {
    //         console.log("jeju res.data : ", res.data)
    //       })
    //       .catch(err=> console.log("err : ", err));
    // },
    onAirHealthEffectGrapth() {
      const District = this.targetLocation.sigungu_cd ? "sgg" : "sd";
      
      let query = {date: this.date}
      if(District == "sgg") query.SD_CD = this.targetLocation.sigungu_cd.substring(0,2);

      this.axios
          .get(`/index_total_pm10/${District}`, {params: query})
          .then(res=>{
            
            var chart = bb.generate({
              data: {
                x: "x",
                columns: [
                  ["x", ...res.data.label],
                  ["대기건강지수", ...res.data.results.map(r => this.$options.filters.index_total_PM10_for_graph(r[this.date]))],
                ],
                type: "spline"
              },
              axis: {
                x: {
                  type: "category",
                  tick: {
                    centered: true,
                    // values: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
                  },
                },
                y: {
                  min: 1,
                  max: 11,
                  tick: {
                    count: 11,
                    values: [1,2,3,4,5,6,7,8,9,10,11],
                    format(v) {
                      if(v==11) return "10+"
                      else return v
                    }
                  }
                }
              },
              size: {
                width: District == "sd" ? window.innerWidth - 600 - 90 : res.data.label.length * 45,
                height: 200,
              },
              padding: {
                left: 60,
                right: 20,
                top: 30,
                bottom: 20 
              },
              legend: {
                show: false
              },
              bindto: "#air-health-effect-graph"
            });
          })
          .catch(err=>console.log("err : ", err))
    },
    onMonthDustAverageGrapth() {
      const District = this.targetLocation.sigungu_cd ? "sgg" : "sd";
      
      this.axios
          .get(`/pm2_5/${District}/monthly`, 
            {
              params: 
                {
                  SGG_CD: this.targetLocation.sigungu_cd || this.targetLocation.SIDO_CD + "000",
                }
            }
          )
          .then(res=>{
            let values = [];
            console.log("res.data.result : ", res.data.result)
            for(let i in res.data.result) {
              values.push(res.data.result[i]);
            }
            
            var chart = bb.generate({
              data: {
                x: "x",
                columns: [
                  ["x", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  ["PM 2.5", ...values],
                ],
                type: "area-spline"
              },
              axis: {
                x: {
                  type: "category",
                  tick: {
                    centered: true
                    // values: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
                  }
                },
              },
              size: {
                width: window.innerWidth - 600 - 60,
                height: 300
              },
              padding: {
                left: 60,
                right: 20,
                top: 30
              },
              legend: {
                show: false
              },
              bindto: "#month-dust-average-graph"
            });
          })
          .catch(err=>console.log("err : ", err))
    },
    searchSggsSelectedTooltip(feature) {
      let point;
      this.axios.get('/index_total_pm10/sgg', {params: {date: this.date, SD_CD: feature.property_SIDO_CD}})
          .then(res=>{
            this.selectedDistricts = res.data.results;
            if(this.selectedDistrictsTooltip) this.selectedDistrictsTooltip.close();
            point = this.setMarkerPoint(feature)
            point.x += 2.8;
            point.y -= 4.05;
          })
          .then(res=>{
            if(feature.property_SIDO_NM == "제주특별자치도") {
              point.x += 0.1;
              point.y += 2.65;
            } else if(feature.property_SIDO_NM == "서울특별시") {
              point.x += 0.1;
            } else if(feature.property_SIDO_NM == "인천광역시") {
              point.x += 0.1;
              point.y += 0.02;
            } else if(feature.property_SIDO_NM == "광주광역시") {
              point.x += 0.1;
              point.y += 1.27;
            } else if(feature.property_SIDO_NM == "울산광역시") {
              point.x += 0.15;
              point.y += 1.45;
            } else if(feature.property_SIDO_NM == "대전광역시") {
              point.x += 0.1;
              point.y += 1.25;
            } else if(feature.property_SIDO_NM == "세종특별자치시") {
              point.x += 0.2;
              point.y += 3.31;
            } else if(feature.property_SIDO_NM == "전라남도") {
              console.log("point.y : ", point.y)
              point.x += 0.2;
              point.y -= 0.3;
              console.log("after point.y : ", point.y)
            } else if(feature.property_SIDO_NM == "충청남도") {
              point.x += 0.08;
              point.y += 0.04;
            } 
            this.selectedDistrictsTooltip.open(this.naverMap, point);
            document.querySelector(".selectedDistrictsTooltip").parentNode.classList.add("selectedDistrictsTooltipWrapper")
            document.querySelector(".selectedDistrictsTooltip").parentNode.parentNode.style = ""
          })
          .catch(err => {
            console.log('err : ', err)
          })
    },
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return true
      } else {
        return false
      }
    },
    initSggMap() {
      this.isLoading=true;
      Promise.all([this.initSggMapData(), this.initPm2_5Sgg(), this.initOverallDeathSgg()]).then(()=>{
        this.initSggMapDrawing(); 
        this.mapDownloadChecker.sggMap = true; 
        this.isLoading=false;
      })
    },
    initSggZoom5Map() {
      this.isLoading=true;
      Promise.all([this.initSggZoom5MapData(), this.initPm2_5Sgg(), this.initOverallDeathSgg()]).then(()=>{
        this.initSggZoom5MapDrawing();
        this.mapDownloadChecker.sggZoom5 = true; 
        this.isLoading=false;
      })
    },
    toggleFilter() {
      this.filterBtn = !this.filterBtn;
    },
    changeDateFilter(key, value) {
      const optionsKey = this.options[key];
      const beforeIndex = optionsKey.indexOf(this.selected[key]);
      const length = optionsKey.length;
      if(beforeIndex == 0 && value == -1) this.selected[key] = optionsKey[length - 1];
      else if(beforeIndex == length-1 && value == 1) this.selected[key] = optionsKey[0];
      else this.selected[key] = optionsKey[beforeIndex + value];
      this.changeDate()
    },
    changeDate() {
      this.$nextTick(()=> {
        if(this.beforeZoom < 5) this.initSdMap();
        else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        else if(this.beforeZoom > 6) this.initSggMap();
      })
    },
    initOverallDeathSd() {
      return new Promise((resolve, reject) => {
        this.axios.get("/overall_death/sd", {params: {date: this.date}})
          .then(res => {
            // console.log("initOverallDeathSd res.data : ", res.data)
            // this.OverallDeathSd = res.data.result;
            this.OverallDeathSdStats = res.data.stats;
            // let sdAddrMin = this.OverallDeathSdStats.min[this.date];
            let sdAddrMax = this.OverallDeathSdStats.max[this.date];
            // this.setSdAddrD3Quantize(sdAddrMin, sdAddrMax);
            this.setSdAddrD3Quantize(0, sdAddrMax);
            // let addrMin = this.OverallDeathSdStats.min[this.date];
            // let addrMax = this.OverallDeathSdStats.max[this.date];
            // this.setAddrD3Quantize(addrMin, addrMax);
            resolve()
          });
      });
    },
    initOverallDeathSgg() {
      return new Promise((resolve, reject) => {
        this.axios.get("/overall_death/sgg", {params: {date: this.date}})
          .then(res => {
            this.OverallDeathSgg = res.data.result;
            this.OverallDeathSggStats = res.data.stats;
            // let addrMin = this.OverallDeathSggStats.min[this.date];
            let addrMax = this.OverallDeathSggStats.max[this.date];
            // this.setAddrD3Quantize(addrMin, addrMax);
            this.setAddrD3Quantize(0, addrMax);
            resolve()
          });
      });
    },
    initPm2_5Sd() {
      return new Promise((resolve, reject) => {
        this.axios.get("/pm2_5/sd", {params: {date: this.date}})
          .then(res => {
            // console.log("res.data.result : ", res.data.result)
            // this.Pm2_5Sd = res.data.result;
            this.Pm2_5SdStats = res.data.stats;
            // let sdAirpolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
            let sdAirpolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
            // this.setSdAirPolD3Linear(sdAirpolMin, sdAirpolMax);
            this.setSdAirPolD3Linear(0, sdAirpolMax);
            resolve()
          });
      });
    },
    initPm2_5Sgg() {
      return new Promise((resolve, reject) => {
        this.axios.get("/pm2_5/sgg", {params: {date: this.date}})
          .then(res => {
            // this.Pm2_5Sgg = res.data.result;
            this.Pm2_5SggStats = res.data.stats;
            // let airpolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
            let airpolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
            // this.setAirPolD3Linear(airpolMin, airpolMax);
            this.setAirPolD3Linear(0, airpolMax);
            resolve()
          });
      });
    },
    initSdMapData() {
      return new Promise((resolve, reject) => {
        this.mapOptions.zoom = this.beforeZoom;
        // 네이버 지도 플랫폼 초기화
        this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);

        this.axios.get("/sd_map", {params: {date: this.date}})
          .then(res => {
            res.data.result.map(sdData => this.naverMap.data.addGeoJson(sdData));
            resolve()
          });
      });
    },
    initSggMapData() {
      return new Promise((resolve, reject) => {
        const center = this.naverMap.getCenter();
        const ne = this.naverMap.getBounds().getNE()
        const distance = this.naverMapProj.getDistance(center, {x: ne.x, y: center.y})
        const date = this.date;
        this.mapOptions.zoom = this.beforeZoom;
        // 네이버 지도 플랫폼 초기화
        this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);
        
        this.axios.get("/sgg_map/allInOne", {params: {center: [center.x, center.y], distance, date}})
          .then(res => {
            this.sggMapData = res.data.result;
            this.sggMapData.map(sggData => this.naverMap.data.addGeoJson(sggData));
            resolve()
          });
      });
    },
    initSggZoom5MapData() {
      return new Promise((resolve, reject) => {
        const center = this.naverMap.getCenter();
        const ne = this.naverMap.getBounds().getNE()
        const distance = this.naverMapProj.getDistance(center, {x: ne.x, y: center.y})
        const date = this.date;
        this.mapOptions.zoom = this.beforeZoom;
        // 네이버 지도 플랫폼 초기화
        this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);

        this.axios.get("/sgg_map/group", {params: {center: [center.x, center.y], distance, date}})
          .then(res => {
            this.groupMapData = res.data.results;
            this.groupMapData.map(gmd => {this.naverMap.data.addGeoJson(gmd);})
            resolve()
          });
      });
    },
    initSdMap() {
      this.isLoading = true;
      Promise.all([this.initSdMapData(), this.initPm2_5Sd(), this.initOverallDeathSd()]).then(()=>{
        this.initSdMapDrawing(); 
      }).then(()=> {
        this.isLoading = false;
      }).catch(err => {
        console.log("err : ", err)
      });
    },
    initSdMapDrawing() {
      return new Promise((resolve, reject) => {
        // // airpol 범례 추가
        let airPolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
        let airPolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
        this.createAirPolD3Legend(airPolMin, airPolMax, "#airpolLegend");
        

        // // // 초과사망자수 범례 추가
        // let addrMin = this.OverallDeathSdStats.min[this.date];
        // let addrMax = this.OverallDeathSdStats.max[this.date];

        this.naverMap.data.setStyle((feature) => {
          let qfc = this.sdAirPolD3Linear(feature.property_PM2_5)
          feature.airPolMainColor = qfc
          let styleOptions = {
              fillColor: feature.airPolMainColor,
              fillOpacity: 0.8,
              strokeColor: '#555',
              strokeWeight: 2,
              strokeOpacity: 0.4,
              strokeDasharray: 3
          };
          return styleOptions
        })
        // 지도 이벤트 설정
        this.naverMap.data.forEach((feature) => {
          // // 미세먼지 농도 Tooltip용 마커
          // feature.airPolTooltipMarker = new naver.maps.Marker({
          //   position: feature.bounds.getCenter(),
          //   map: this.naverMap,
          //   icon: {
          //     content: "<div class='airPolTooltipMarker' style='display: none;'></div>",
          //     size: new naver.maps.Size(22, 35),
          //     anchor: new naver.maps.Point(11, 35),
          //   }
          // });
          // targetLocation이 이미 있으면 정보만 업데이트
          if(this.targetLocation && this.targetLocation.SIDO_CD == feature.property_SIDO_CD) {
            this.targetLocation = {}
            
            this.GetTargetLocationData.forEach((t)=>{
              this.targetLocation[t] = feature["property_" + t]
            })
          }

          // 마커 그리기(who 기준 or 건강영향도)
          this.drawMarker(feature);

          naver.maps.Event.addListener(feature, 'click', (e) => {
            if(this.beforeMarker) this.beforeMarker.eventTarget.classList.remove("map-clicked");
            this.beforeMarker = feature.mapMarker;
            // this.bgCancel = true;
            feature.mapMarker.eventTarget.classList.add("map-clicked");

            if(!this.sideMenu) this.sideMenu = true;
            this.targetLocation = {}
            
            this.GetTargetLocationData.forEach((t)=>{
              this.targetLocation[t] = feature["property_" + t]
            })
            
            // 클릭시 범례 dot 표시
            if(this.airPolToggle) {
              if(this.districtStandard != "sd") this.setLegendDot(feature.property_PM2_5, 40);
              else this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date]);
              // this.setAirHealthEffectDot(feature.property_Index_total_PM10);
              this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
            }
            
            this.naverMap.data.overrideStyle(feature, {
              strokeColor: '#000',
              strokeWeight: 4
            });

            this.searchSggsSelectedTooltip(feature);
            this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
          });

          naver.maps.Event.addListener(feature.mapMarker, 'click', (e) => {
            if(this.beforeMarker) this.beforeMarker.eventTarget.classList.remove("map-clicked");
            this.beforeMarker = feature.mapMarker;
            // this.bgCancel = true;

            feature.mapMarker.eventTarget.classList.add("map-clicked");

            if(!this.sideMenu) this.sideMenu = true;
            this.targetLocation = {}
            
            this.GetTargetLocationData.forEach((t)=>{
              this.targetLocation[t] = feature["property_" + t]
            })
            
            // 클릭시 범례 dot 표시
            if(this.airPolToggle) {
              if(this.districtStandard != "sd") this.setLegendDot(feature.property_PM2_5, 40);
              else this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date]);
              // this.setAirHealthEffectDot(feature.property_Index_total_PM10);
              this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
            }
            
            this.naverMap.data.overrideStyle(feature, {
              strokeColor: '#000',
              strokeWeight: 4
            });
            
            this.searchSggsSelectedTooltip(feature);
            this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
          });

          naver.maps.Event.addListener(feature.mapMarker, 'mouseover', (e) => {
            this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
            feature.mapMarker.eventTarget.classList.add("map-hover");
            // if(this.airPolToggle) {
            //   const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);              
            //   const x = feature.bounds.getCenter().x + 0.2;
            //   const y = feature.bounds.getCenter().y + 0.2;

            //   feature.airPolTooltipMarker.setOptions({
            //     visible: true,
            //     position: {x: x, y:y},
            //     map: this.naverMap,
            //     icon: {
            //       content: 
            //         "<div class=airPolTooltipMarker style='display: block;'>" + 
            //           "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
            //           "<b>" + tooltipValue + "</b>" + "</p>" +
            //         "</div>",
            //       size: new naver.maps.Size(22, 35),
            //       anchor: new naver.maps.Point(11, 35),
            //     }
            //   })
            // }
          });

          naver.maps.Event.addListener(feature, 'mouseover', (e) => {
            this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
            feature.mapMarker.eventTarget.classList.add("map-hover");
            // if(this.airPolToggle) {
            //   let tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
            //   let x = feature.bounds.getCenter().x + 0.2;
            //   let y = feature.bounds.getCenter().y + 0.2;

            //   feature.airPolTooltipMarker.setOptions({
            //     visible: true,
            //     position: {x: x, y:y},
            //     map: this.naverMap,
            //     icon: {
            //       content: 
            //         "<div class=airPolTooltipMarker style='display: block;'>" + 
            //           "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
            //           "<b>" + tooltipValue + "</b>" + "</p>" +
            //         "</div>",
            //       size: new naver.maps.Size(22, 35),
            //       anchor: new naver.maps.Point(11, 35),
            //     }
            //   })
            // }
          });

          naver.maps.Event.addListener(feature.mapMarker, 'mouseout', (e) => { 
            this.naverMap.data.overrideStyle(feature, {
              strokeWeight: 2
            });
            feature.mapMarker.eventTarget.classList.remove("map-hover");
            // if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
          });

          naver.maps.Event.addListener(feature, 'mouseout', (e) => { 
            this.naverMap.data.overrideStyle(feature, {
              strokeWeight: 2
            });
            feature.mapMarker.eventTarget.classList.remove("map-hover");
            // if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
          });
        });

        // // 줌 변경시 지도 변경
        // this.naverMap.addListener('zoom_changed', (zoom) => {
        //   if(!this.zoomChanged) return false;
        //   this.mapOptions.zoom = zoom;
        //   this.beforeZoom = zoom;
        //   const beforeCheck = this.beforeZoom < 5 ? true : false
        //   const currentCheck = zoom < 5 ? true : false
        //   this.beforeZoom = zoom
        //   if(beforeCheck && currentCheck) return null
        //   else {
        //     const center = this.naverMap.getCenter();
        //     this.mapOptions.center = center
        //     const ne = this.naverMap.getBounds().getNE()
        //     const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
        //     if(this.beforeZoom < 5) this.initSdMap();
        //     else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        //     else if(this.beforeZoom > 6) this.initSggMap();
        //   }
        // });
        resolve()
      })
    },
    initSggZoom5MapDrawing() { // zoom 5일 걍우 그룹지역만
      // airpol 범례 추가
      let airPolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
      let airPolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
      this.createAirPolD3Legend(airPolMin, airPolMax, "#airpolLegend");

      this.naverMap.data.setStyle((feature) => {
        if(!feature.bounds) return false;

        // // 미세먼지 농도 Tooltip용 마커
        // feature.airPolTooltipMarker = new naver.maps.Marker({});

        // // Tooltip용 마커 pointer-events none 설정
        // const aptm = document.querySelectorAll(".airPolTooltipMarker");
        // if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

        // airPol 색깔 및 css 옵션 설정
        let qfc = this.airPolD3Linear(feature.property_PM2_5)
        feature.airPolMainColor = qfc

        // targetLocation이 이미 있으면 정보만 업데이트
        if(this.targetLocation && this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {
          // this.targetLocation = {
          //   OverallDeath: feature.property_OverallDeath,
          //   OverallDeathBeta: feature.property_OverallDeathBeta,
          //   PM2_5: feature.property_PM2_5,
          //   sigungu_cd: feature.property_sigungu_cd,
          //   sigungu_nm: feature.property_sigungu_nm,
          //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
          //   MaleOverallDeath: feature.property_MaleOverallDeath,
          //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
          //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
          //   Index_total_PM10: feature.property_Index_total_PM10
          // }
          this.targetLocation = {}
            
          this.GetTargetLocationData.forEach((t)=>{
            this.targetLocation[t] = feature["property_" + t]
          })
        }
        
        let styleOptions = {
            fillColor: feature.airPolMainColor,
            fillOpacity: 0.8,
            strokeColor: '#555',
            strokeWeight: 2,
            strokeOpacity: 0.4,
            strokeDasharray: 3
        };

        // 마커 그리기(who 기준 or 건강영향도)
        this.drawMarker(feature);

        if(feature.property_group) {
          naver.maps.Event.addListener(feature.mapMarker, 'click', (e) => {
            // 부산(21), 대구(22), 인천(23)
            if(["21000", "22000"].includes(feature.property_sigungu_cd)) {
              this.naverMap.updateBy(feature.bounds.getCenter(),7);
            } else if (feature.property_sigungu_cd == "23000") {
              const center = feature.bounds.getCenter();
              this.naverMap.updateBy({x: center.x + 1, y: center.y},7);
            } else {
              this.naverMap.updateBy(feature.bounds.getCenter(),7);
            }
          })
        }
        // 초과사망자수 마커 pointer-events none 설정
        const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
        if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

        return styleOptions;
      });

      this.naverMap.data.addListener('mouseover', (e) => {
        let feature = e.feature;
        
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 4
        });

        // if(this.airPolToggle) {    
        //   const x = feature.bounds.getCenter().x + 0.06;
        //   const y = feature.bounds.getCenter();

        //   const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
        //   feature.airPolTooltipMarker.setOptions({
        //     visible: true,
        //     position: {x: feature.bounds.getCenter().x+0.11, y: feature.bounds.getCenter().y},
        //     map: this.naverMap,
        //     icon: {
        //       content: 
        //         "<div class=airPolTooltipMarker style='display: block;'>" + 
        //           "<p class='mb-0'>" + feature.property_sigungu_nm + "<br>" +
        //           "<b>" + tooltipValue + "</b>" + "</p>" +
        //         "</div>",
        //       size: new naver.maps.Size(22, 35),
        //       anchor: new naver.maps.Point(11, 35),
        //     }
        //   });
        // }
      });

      this.naverMap.data.addListener('mouseout', (e) => {
        let feature = e.feature;
        
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 2
        });
        // if(this.airPolToggle) feature.airPolTooltipMarker.setVisible(false)
      });

      this.naverMap.data.addListener('click', (e) => {
        if(!this.sideMenu) this.sideMenu = true;
        let feature = e.feature;
        
        // this.targetLocation = {
        //   OverallDeath: feature.property_OverallDeath,
        //   OverallDeathBeta: feature.property_OverallDeathBeta,
        //   PM2_5: feature.property_PM2_5,
        //   sigungu_cd: feature.property_sigungu_cd,
        //   sigungu_nm: feature.property_sigungu_nm,
        //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
        //   MaleOverallDeath: feature.property_MaleOverallDeath,
        //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
        //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
        //   Index_total_PM10: feature.property_Index_total_PM10
        // }
        this.targetLocation = {}
        
        this.GetTargetLocationData.forEach((t)=>{
          this.targetLocation[t] = feature["property_" + t]
        })

        // 클릭시 범례 dot 표시
        if(this.airPolToggle) {
          this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date]);
          // this.setAirHealthEffectDot(feature.property_Index_total_PM10);
          this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
        }
        
        // this.pathRevertStyle(feature);
        
        this.naverMap.data.overrideStyle(feature, {
          strokeColor: '#000',
          strokeWeight: 4
        });

        // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
      });

      // // 줌 변경시 지도 변경
      // this.naverMap.addListener('zoom_changed', (zoom) => {
      //   if(!this.zoomChanged) return false;

      //   this.mapOptions.zoom = zoom
      //   this.beforeZoom = zoom

      //   const center = this.naverMap.getCenter();
      //   this.mapOptions.center = center
      //   const ne = this.naverMap.getBounds().getNE()
      //   // console.log("zoom_changed center :", center)
      //   // console.log("zoom_changed ne :", ne)
      //   const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
      //   // console.log("zoom_changed distance :", distance)

      //   if(this.beforeZoom < 5) this.initSdMap();
      //   else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
      //   else if(this.beforeZoom > 6) this.initSggMap();
      // });


      // 드래그 시
      this.naverMap.addListener('dragend', () => {
        const center = this.naverMap.getCenter();
        this.mapOptions.center = center;
        const ne = this.naverMap.getBounds().getNE();
        if(this.beforeZoom < 5) this.initSdMap();
        else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        else if(this.beforeZoom > 6) this.initSggMap();
      });
    },

    initSggMapDrawing() { // zoom 5일 걍우 그룹지역만
      // airpol 범례 추가
      let airPolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
      let airPolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
      this.createAirPolD3Legend(airPolMin, airPolMax, "#airpolLegend");

      this.naverMap.data.setStyle((feature) => {
        if(!feature.bounds) return false;

        // // 미세먼지 농도 Tooltip용 마커
        // feature.airPolTooltipMarker = new naver.maps.Marker({});

        // // Tooltip용 마커 pointer-events none 설정
        // const aptm = document.querySelectorAll(".airPolTooltipMarker");
        // if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

        // targetLocation이 이미 있으면 정보만 업데이트
        if(this.targetLocation && this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {
          this.targetLocation = {}
            
          this.GetTargetLocationData.forEach((t)=>{
            this.targetLocation[t] = feature["property_" + t]
          })
        }

        // airPol 색깔 및 css 옵션 설정
        let qfc = this.airPolD3Linear(feature.property_PM2_5)
        feature.airPolMainColor = qfc
        
        let styleOptions = {
            fillColor: feature.airPolMainColor,
            fillOpacity: 0.8,
            strokeColor: '#555',
            strokeWeight: 2,
            strokeOpacity: 0.4,
            strokeDasharray: 3
        };
        
        // 마커 그리기(who 기준 or 건강영향도)
        this.drawMarker(feature);

        // 초과사망자수 마커 pointer-events none 설정
        const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
        if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

        return styleOptions;
      });

      this.naverMap.data.addListener('mouseover', (e) => {
        let feature = e.feature;
        
        this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
        feature.mapMarker.eventTarget.classList.add("map-hover");
      });

      this.naverMap.data.addListener('mouseout', (e) => {
        let feature = e.feature;
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 2
        });
        feature.mapMarker.eventTarget.classList.remove("map-hover");
      });

      this.naverMap.data.addListener('click', (e) => {
        if(!this.sideMenu) this.sideMenu = true;
        let feature = e.feature;
        this.targetLocation = {}
        
        this.GetTargetLocationData.forEach((t)=>{
          this.targetLocation[t] = feature["property_" + t]
        })

        // 클릭시 범례 dot 표시
        if(this.airPolToggle) {
          this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date]);
          this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
        }
        
        this.naverMap.data.overrideStyle(feature, {
          strokeColor: '#000',
          strokeWeight: 4
        });

        if(this.beforeMarker) this.beforeMarker.eventTarget.classList.remove("map-clicked");
        
        this.beforeMarker = feature.mapMarker;
        feature.mapMarker.eventTarget.classList.add("map-clicked");

        console.log("this.targetLocation : ", this.targetLocation)
        this.initSggOpenApiPm2_5({ 
          SGG_CD: feature.property_sigungu_cd,
          SGG_NM: feature.property_sigungu_nm,
          SD_CD: (feature.property_sigungu_cd).substring(0,2),
          SD_NM: codeToSD[(feature.property_sigungu_cd).substring(0,2)]
        });
      });

      // // 줌 변경시 지도 변경
      // this.naverMap.addListener('zoom_changed', (zoom) => {
      //   if(!this.zoomChanged) return false;

      //   // console.log("=====initSggMapDrawing zoom_changed =====")
      //   // console.log("before zoom : ", this.beforeZoom)
      //   // console.log("changed zoom : ", zoom)
      //   this.mapOptions.zoom = zoom
      //   this.beforeZoom = zoom

      //   const center = this.naverMap.getCenter();
      //   this.mapOptions.center = center
      //   const ne = this.naverMap.getBounds().getNE()
      //   // console.log("zoom_changed center :", center)
      //   // console.log("zoom_changed ne :", ne)
      //   const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
      //   // console.log("zoom_changed distance :", distance)
      //   // console.log("this.naverMapProj.fromCoordToOffset(center) : ", this.naverMapProj.fromCoordToOffset(center))

      
      //   // let beforeCheck = this.beforeZoom > 3 ? true : false
      //   // let currentCheck = zoom > 3 ? true : false
      //   // this.beforeZoom = zoom
      //   // if(beforeCheck != currentCheck) {
      //   //   if(zoom > 3) this.turnOnSggMap();
      //   //   else this.turnOnSdMap();
      //   // }

      //   // if(this.beforeZoom < 5) this.initSdMap();
      //   // else if(this.beforeZoom == 5) this.initSggZoom5Map();
      //   // else if(this.beforeZoom > 5) this.initSggMap();

      //   if(this.beforeZoom < 5) this.initSdMap();
      //   else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
      //   else if(this.beforeZoom > 6) this.initSggMap();
      // });


      // 드래그 시
      this.naverMap.addListener('dragend', () => {
        const center = this.naverMap.getCenter();
        this.mapOptions.center = center;
        const ne = this.naverMap.getBounds().getNE();
        if(this.beforeZoom < 5) this.initSdMap();
        else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        else if(this.beforeZoom > 6) this.initSggMap();
      });
    },
    searchSdMapDrawing(code) {
        // // airpol 범례 추가
        let airPolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
        let airPolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
        this.createAirPolD3Legend(airPolMin, airPolMax, "#airpolLegend");

        this.naverMap.data.setStyle((feature) => {

          // airPol 색깔 및 css 옵션 설정
          feature.sdAirPolMainColor = null;
          let fill_opacity = 0;
          if(this.targetLocation.SIDO_CD == feature.property_SIDO_CD) {
            let qfc = this.sdAirPolD3Linear(feature.property_PM2_5)
            feature.sdAirPolMainColor = qfc
            fill_opacity = 0.8
            // 클릭시 범례 dot 표시
            if(this.airPolToggle) {
              if(this.districtStandard != "sd") this.setLegendDot(feature.property_PM2_5, 40);
              else this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date]);
              // this.setAirHealthEffectDot(feature.property_Index_total_PM10);
              this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
            }
          }
          
          let styleOptions = {
              fillColor: feature.sdAirPolMainColor,
              fillOpacity: fill_opacity,
              strokeColor: '#555',
              strokeWeight: 2,
              strokeOpacity: 0.4,
              strokeDasharray: 3
          };

          return styleOptions
        })
        // 지도 이벤트 설정
        this.naverMap.data.forEach((feature) => {
          if(feature.property_group) return false;
          if(feature.property_sigungu_cd) return false;

          // // 미세먼지 농도 Tooltip용 마커
          // feature.airPolTooltipMarker = new naver.maps.Marker({
          //   position: feature.bounds.getCenter(),
          //   map: this.naverMap,
          //   icon: {
          //     content: "<div class='airPolTooltipMarker' style='display: none;'></div>",
          //     size: new naver.maps.Size(22, 35),
          //     anchor: new naver.maps.Point(11, 35),
          //   }
          // });
          // // tooltip용 마커 pointer-events none 설정
          // const aptm = document.querySelectorAll(".airPolTooltipMarker");
          // if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";


          if(this.targetLocation.SIDO_CD == feature.property_SIDO_CD) {
            // 화면 위치 이동 
            const center = feature.bounds.getCenter();
            this.beforeZoom = 2
            this.naverMap.updateBy({x: center.x-0.5, y: center.y},this.beforeZoom)

            this.searchSggsSelectedTooltip(feature);
            
            // 마커 그리기(who 기준 or 건강영향도)
            this.drawMarker(feature);
            
            naver.maps.Event.addListener(feature.mapMarker, 'click', () => {
              if(["21", "22", "23"].includes(feature.property_SIDO_CD)) {
                this.naverMap.updateBy(feature.bounds.getCenter(),7);
              } else {
                this.naverMap.updateBy(feature.bounds.getCenter(),5);
              }
              this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
            });

            naver.maps.Event.addListener(feature.mapMarker, 'mouseover', (e) => {
              this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
            });

            naver.maps.Event.addListener(feature.mapMarker, 'mouseout', (e) => { 
              this.naverMap.data.overrideStyle(feature, {
                strokeWeight: 2
              });
              // if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
            });

          }
          // 초과사망자수 마커 pointer-events none 설정
          const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
          if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

          naver.maps.Event.addListener(feature, 'click', (e) => {
            if(!this.sideMenu) this.sideMenu = true;
            
            this.targetLocation = {}
            
            this.GetTargetLocationData.forEach((t)=>{
              this.targetLocation[t] = feature["property_" + t]
            })

            // 클릭시 범례 dot 표시
            if(this.airPolToggle) {
              if(this.districtStandard != "sd") this.setLegendDot(feature.property_PM2_5, 40);
              else this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date]);
              // this.setAirHealthEffectDot(feature.property_Index_total_PM10);
              this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
            }
            
            this.naverMap.data.overrideStyle(feature, {
              strokeColor: '#000',
              strokeWeight: 4
            });
            
            // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
            
            this.searchSggsSelectedTooltip(feature);
            this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
          });

          naver.maps.Event.addListener(feature, 'mouseover', (e) => {
            this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
            // if(this.airPolToggle) {
            //   let tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
            //   let x = feature.bounds.getCenter().x + 0.2;
            //   let y = feature.bounds.getCenter().y + 0.2;

            //   feature.airPolTooltipMarker.setOptions({
            //     visible: true,
            //     position: {x: x, y:y},
            //     map: this.naverMap,
            //     icon: {
            //       content: 
            //         "<div class=airPolTooltipMarker style='display: block;'>" + 
            //           "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
            //           "<b>" + tooltipValue + "</b>" + "</p>" +
            //         "</div>",
            //       size: new naver.maps.Size(22, 35),
            //       anchor: new naver.maps.Point(11, 35),
            //     }
            //   })
            // }
          });

          naver.maps.Event.addListener(feature, 'mouseout', (e) => { 
            this.naverMap.data.overrideStyle(feature, {
              strokeWeight: 2
            });
            // if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
          });
        });

        // 줌 변경시 지도 변경
        // this.naverMap.addListener('zoom_changed', (zoom) => {
        //   if(!this.zoomChanged) return false;

        //   // // console.log("------mounted zoom_changed------")
        //   // console.log("before zoom : ", this.beforeZoom)
        //   // console.log("changed zoom : ", zoom)
        //   this.mapOptions.zoom = zoom;
        //   this.beforeZoom = zoom;
          
        //   const beforeCheck = this.beforeZoom < 5 ? true : false
        //   const currentCheck = zoom < 5 ? true : false
        //   this.beforeZoom = zoom
        //   if(beforeCheck && currentCheck) return null
        //   else {
        //     const center = this.naverMap.getCenter();
        //     this.mapOptions.center = center
        //     const ne = this.naverMap.getBounds().getNE()
        //     // console.log("zoom_changed center :", center)
        //     // console.log("zoom_changed ne :", ne)
        //     const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
        //     // console.log("zoom_changed distance :", distance)
        //     // if(this.beforeZoom == 5) this.initSggZoom5Map();
        //     // else if(this.beforeZoom > 5) this.initSggMap();

        //     if(this.beforeZoom < 5) this.initSdMap();
        //     else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        //     else if(this.beforeZoom > 6) this.initSggMap();
        //   }
        // });
    },
    searchSggMapDrawing() { // zoom 5일 걍우 그룹지역만
      // airpol 범례 추가
      let airPolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
      let airPolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
      this.createAirPolD3Legend(airPolMin, airPolMax, "#airpolLegend");
      
      this.naverMap.data.setStyle((feature) => {
        if(!feature.bounds) return false;

        // // 미세먼지 농도 Tooltip용 마커
        // feature.airPolTooltipMarker = new naver.maps.Marker({
        //   position: feature.bounds.getCenter(),
        //   map: this.naverMap,
        //   icon: {
        //     content: "<div class='airPolTooltipMarker' style='display: none;'></div>",
        //     size: new naver.maps.Size(22, 35),
        //     anchor: new naver.maps.Point(11, 35),
        //   }
        // });

        // // Tooltip용 마커 pointer-events none 설정
        // const aptm = document.querySelectorAll(".airPolTooltipMarker");
        // if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

        // airPol 색깔 및 css 옵션 설정
        feature.airPolMainColor = null;
        let fill_opacity = 0;
        if(this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {
          let qfc = this.airPolD3Linear(feature.property_PM2_5)
          feature.airPolMainColor = qfc
          fill_opacity = 0.8
          
          // 클릭시 범례 dot 표시
          if(this.airPolToggle) {
            this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date]);
            this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
          }
        }
        
        let styleOptions = {
            fillColor: feature.airPolMainColor,
            fillOpacity: fill_opacity,
            strokeColor: '#555',
            strokeWeight: 2,
            strokeOpacity: 0.4,
            strokeDasharray: 3
        };
        return styleOptions;
      });
      
      this.naverMap.data.forEach((feature) => {
        if(this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {

          // 화면 위치 이동
          const center = feature.bounds.getCenter();
          this.beforeZoom = 7
          this.naverMap.updateBy({x: center.x-0.05, y: center.y},this.beforeZoom)

          // 마커 그리기(who 기준 or 건강영향도)
          this.drawMarker(feature);
        }
      });

      this.naverMap.data.addListener('mouseover', (e) => {
        let feature = e.feature;
        
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 4
        });

        // if(this.airPolToggle) {
        //   const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
              
        //   const x = feature.bounds.getCenter().x + 0.06;
        //   const y = feature.bounds.getCenter();
        //   feature.airPolTooltipMarker.setOptions({
        //     visible: true,
        //     position: {x: x, y: y},
        //     map: this.naverMap,
        //     icon: {
        //       content: 
        //         "<div class=airPolTooltipMarker style='display: block;'>" + 
        //           "<p class='mb-0'>" + feature.property_sigungu_nm + "<br>" +
        //           "<b>" + tooltipValue + "</b>" + "</p>" +
        //         "</div>",
        //       size: new naver.maps.Size(22, 35),
        //       anchor: new naver.maps.Point(11, 35),
        //     }
        //   })
        // }
      });

      this.naverMap.data.addListener('mouseout', (e) => {
        let feature = e.feature;
        // if(!feature.property_zoom_5) return null
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 2
        });
        // if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
      });

      this.naverMap.data.addListener('click', (e) => {
        if(!this.sideMenu) this.sideMenu = true;
        let feature = e.feature;
        
        this.targetLocation = {}
        
        this.GetTargetLocationData.forEach((t)=>{
          this.targetLocation[t] = feature["property_" + t]
        })

        // 클릭시 범례 dot 표시
        if(this.airPolToggle) {
          this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date])
          this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
        }
        
        this.naverMap.data.overrideStyle(feature, {
          strokeColor: '#000',
          strokeWeight: 4
        });

        this.initSggOpenApiPm2_5({ 
          SGG_CD: feature.property_sigungu_cd,
          SGG_NM: feature.property_sigungu_nm,
          SD_CD: (feature.property_sigungu_cd).substring(0,2),
          SD_NM: codeToSD[(feature.property_sigungu_cd).substring(0,2)]
        });
      });

      // // 줌 변경시 지도 변경
      // this.naverMap.addListener('zoom_changed', (zoom) => {
      //   if(!this.zoomChanged) return false;
      //   console.log("=====initSggMapDrawing zoom_changed =====")
      //   console.log("before zoom : ", this.beforeZoom)
      //   console.log("changed zoom : ", zoom)
      //   this.mapOptions.zoom = zoom
      //   this.beforeZoom = zoom
      //   const center = this.naverMap.getCenter();
      //   this.mapOptions.center = center
      //   const ne = this.naverMap.getBounds().getNE()
      //   console.log("zoom_changed center :", center)
      //   console.log("zoom_changed ne :", ne)
      //   const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
      //   console.log("zoom_changed distance :", distance)
      //   console.log("this.naverMapProj.fromCoordToOffset(center) : ", this.naverMapProj.fromCoordToOffset(center))

      
      //   // let beforeCheck = this.beforeZoom > 3 ? true : false
      //   // let currentCheck = zoom > 3 ? true : false
      //   // this.beforeZoom = zoom
      //   // if(beforeCheck != currentCheck) {
      //   //   if(zoom > 3) this.turnOnSggMap();
      //   //   else this.turnOnSdMap();
      //   // }
      //   if(this.beforeZoom < 5) this.initSdMap();
      //   else if(this.beforeZoom == 5) this.initSggZoom5Map();
      //   else if(this.beforeZoom > 5) this.initSggMap();
      // });


      // // 드래그 시
      // this.naverMap.addListener('dragend', () => {
      //   const center = this.naverMap.getCenter();
      //   this.mapOptions.center = center;
      //   const ne = this.naverMap.getBounds().getNE();
      //   if(this.beforeZoom < 5) this.initSdMap();
      //   else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
      //   else if(this.beforeZoom > 6) this.initSggMap();
      // });
    },
    pathRevertStyle(f) {
        if(this.clickedBeforePath) this.naverMap.data.revertStyle(this.clickedBeforePath);
        if(f) this.clickedBeforePath = f;
    },
    toggleFilterSwitch(target) {
      if(target=="airpol") {
        this.airPolToggle = !this.airPolToggle
        if(this.airPolToggle) return this.onChangeAirPolDataFilter('PM2_5');
        else return this.turnOffAirPolMap();
      }
      else if(target=="addr") {
        this.addrToggle = !this.addrToggle
        if(this.addrToggle) return this.onChangeAddrDataFilter(this.airPolTopic, 'ad');
        else return this.turnOffAddrMap();
      }
    },
    unitText(value) {
      if (value == "PM2_5") return "㎍/㎥";
      if (value == "PM10") return "㎍/㎥";
      if (value == "NO2") return "ppm";
      if (value == "ad") return "명";
      return ""
    },
    setAirPolD3Linear(min, max) {
      this.airPolD3Linear = d3.scale.linear()
                                .domain([min, max])
                                .range(['#FFF', '#2F3545']);
    },
    setSdAirPolD3Linear(min, max) {
      this.sdAirPolD3Linear = d3.scale.linear()
                                .domain([min, max])
                                .range(['#FFF', '#2F3545']);
    },
    setAddrD3Quantize(min, max) {
      this.addrD3Quantize = d3.scale.quantize()
                                .domain([min, max])
                                .range(d3.range(5).map((i) => { 
                                    if (i != undefined) {return "p" + i; }
                                }));
    },
    setSdAddrD3Quantize(min, max) {
      this.sdAddrD3Quantize = d3.scale.quantize()
                                .domain([min, max])
                                .range(d3.range(5).map((i) => { 
                                    if (i != undefined) {return "p" + i; }
                                }));
    },
    createAirPolD3Legend(min, max, el) {
      d3.select(el).html("");
      
      let defs = d3.select(el).append("defs"),
          linearGradient = defs.append("linearGradient")
                                .attr("id", "linear-gradient")
                                .attr("x1", "0%")
                                .attr("y1", "0%")
                                .attr("x2", "100%")
                                .attr("y2", "0%");
      //Set the color for the start (0%)
      linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", 'rgba(255, 255, 255, 0.8)')
      //Set the color for the end (100%)
      linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", 'rgba(47, 53, 69, 0.8)');
        
      let airpolLegendRect = d3.select(el).append("rect")
          .attr("width", this.legendRectBoundsWidth)
          .attr("height", this.legendBarHeight)
          .attr("transform", `translate(${this.legendDotMarginLeft},${this.legendDotMarginTop})`)
          .style({
            "fill": "url(#linear-gradient)", 
            "stroke": "silver",
            "stroke-width": "1px",
          });
      
      let legendRectBounds = d3.select(el + " rect").node().getBoundingClientRect();
      // let legendRectBounds = airpolLegendRect.node().getBoundingClientRect();
      let y = d3.scale.linear()
        // .range([0, legendRectBounds.width])
        .range([0, this.legendRectBoundsWidth])
        .domain([0, Math.ceil(max/10)*10]);
      
      let yAxis = d3.svg.axis()
          .orient("bottom")
          .ticks(1)
          // .tickFormat(formatPercent)
          .scale(y);
          
      d3.select(el).append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + this.legendDotMarginLeft + "," + (this.legendBarHeight + this.legendDotMarginTop)+ ")")
        .call(yAxis)
      
      // 위치표기 dot
      let legendDot = d3.select(el).append("g")
        .attr("class", "legendDot")
        .attr("transform", "translate(" + this.legendDotMarginLeft + "," + (this.legendBarHeight + 3) + ")");
      legendDot.append('path');
      legendDot.append('line');
      legendDot.append('text').attr("class","upper");
      legendDot.append('text').attr("class","lower");
    },
    createAddrD3Legend(qu, r, min, max) {
      this.d3Legend = d3.legend.color()
                              .labelFormat(d3.format(r == "RR" ? ".3f" : ".0f"))
                              .useClass(true)
                              .scale(qu);
      d3.select("#addrLegend").call(this.d3Legend)
    },
    initLegendDot() {
      d3.select(".legendDot").style("display", "none");
    },
    setLegendDot(val, max) {
      d3.select(".legendDot").style("display", "inherit");
      
      let maxEnd = Math.ceil(max/10)*10;
      let arc = d3.svg.symbol().type('triangle-down').size(40);
      d3.select("#airpolLegend .legendDot")
        .attr("transform", "translate(" + (this.legendDotMarginLeft + Math.floor(Math.floor(val)/maxEnd * (this.legendRectBoundsWidth))) + "," + (this.legendBarHeight + this.legendDotMarginTop) + ")")
      d3.select("#airpolLegend .legendDot path")
          .attr('d',arc)
          .attr('fill', "rgb(47,48,56)")
          .attr("transform", `translate(0,${-this.legendBarHeight - 10})`);
      d3.select("#airpolLegend .legendDot line")
          .attr("x1", 0)
          .attr("y1", -this.legendBarHeight - 5)
          .attr("x2", 0)
          .attr("y2", 5)
          .attr("stroke-width", 1)
          .attr("stroke", "rgb(47,48,56)");

      d3.select("#airpolLegend .legendDot text.upper")
          .attr("x", -20)
          .attr("y", -this.legendBarHeight - 20)
          .style("font-size", "16px")
          .text(Math.floor(val) + "㎍/㎥");

      d3.select("#airpolLegend .legendDot text.lower")
          .attr("x", -7)
          .attr("y", this.legendBarHeight - 12)
          .style("font-size", "13px")
          .text(Math.floor(val));
    },
    turnClassToColor (t) {
      if(t=="p0") return "rgb(89,136,222)";
      if(t=="p1") return "rgb(97,207,37)";
      if(t=="p2") return "#fe9929";
      if(t=="p3") return "#d95f0e";
      if(t=="p4") return "#993404";
    },
    showModal () {
      this.$refs.myModalRef.show();
    },
    hideModal () {
      this.$refs.myModalRef.hide();
    },
    searchLocation() {
      if(!this.searchQuery) return this.$toasted.error("검색어를 입력해주세요.")
      // this.searchList = sggStat.filter(r => {return String(r["KOR_SGG_NM"]).includes(this.searchQuery) });
      this.axios
          .get("/districts", {params: {searchQuery: this.searchQuery}})
          .then(res => {
            if(res.data.result.length == 0) return this.$toasted.info("결과가 없습니다. 다시 검색해주세요.")
            this.searchList =  res.data.result;
          })
          .catch(err => {
            console.log('err : ', err)
          })
    },
    goToSggMap(code, date) {
      this.axios
        .get("/districts/go/sgg", {params: {code, date}})
        .then(res => {
          this.naverMap.data.addGeoJson(res.data.result);

          return new Promise((resolve, reject) => {
            this.sideMenu = true;
            this.mapDownloadChecker.sggMap = true; 
            this.beforeZoom = 7;
            this.naverMap.data.forEach(feature => {
              this.targetLocation = {}
              
              this.GetTargetLocationData.forEach((t)=>{
                this.targetLocation[t] = feature["property_" + t]
              })
              // 화면 위치 이동
              const center = feature.bounds.getCenter();
              this.naverMap.updateBy({x: center.x-0.05, y: center.y},this.beforeZoom);

              this.initSggOpenApiPm2_5({ 
                SGG_CD: feature.property_sigungu_cd,
                SGG_NM: feature.property_sigungu_nm,
                SD_CD: (feature.property_sigungu_cd).substring(0,2),
                SD_NM: codeToSD[(feature.property_sigungu_cd).substring(0,2)]
              });
            })
            resolve()
          })
          .then(() => {
            Promise.all([this.initSggMapData(), this.initPm2_5Sgg(), this.initOverallDeathSgg()]).then(()=>{
              this.searchSggMapDrawing();
              this.mapDownloadChecker.sggMap = true; 
              this.isLoading=false;
              this.zoomChanged = true;
            })
          })
          .catch(err => {
            console.log("err : ", err)
          })
        })
        .catch(err => {
          console.log("err : ", err)
        })
    },
    goToSdMap(code, date) {
      this.isLoading=true;
      this.axios
        .get("/districts/go/sd", {params: {code, date}})
        .then(res => {
          this.naverMap.data.addGeoJson(res.data.result);

          return new Promise((resolve, reject) => {
            this.sideMenu = true;
            this.mapDownloadChecker.sggMap = false; 
            this.beforeZoom = 2;
            this.naverMap.data.forEach(feature => {
              if(feature.property_SIDO_CD != code) return false
              this.targetLocation = {}
              
              this.GetTargetLocationData.forEach((t)=>{
                this.targetLocation[t] = feature["property_" + t]
              })
              
              this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
            })
            resolve()
          })
          .then(() => {
            Promise.all([this.initSdMapData(), this.initPm2_5Sd(), this.initOverallDeathSd()]).then(()=>{
              this.searchSdMapDrawing(code);
              this.isLoading = false;
              this.zoomChanged = true;
            })
          })
          .catch(err => {
            console.log("err : ", err)
          })
        })
        .catch(err => {
          console.log("err : ", err)
        })
    },
    goToLocation(SGG_CD) {
      // this.searchQuery = null;
      this.zoomChanged = false; // zoom_changed 이벤트 영향 안받게
      this.searchList = []; // 리스트 초기화
      this.isLoading=true;
      this.sideMenu = true;
      const check =  SGG_CD.split("000");
      const path = check[1] == "" ? "sd" : "sgg";
      const code = check[1] == "" ? check[0] : SGG_CD;
      this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);
      this.goTo = true;
      if(path == "sd") {
        this.goToSdMap(code, this.date);
      } else if(path == "sgg") {
        this.goToSggMap(code, this.date)
      }
    },
    cancelDetail(){
      this.sideMenu = false;
      this.viewDetail = false;
      this.selectedDistrictsTooltip.close();
      if(this.goTo) {
        // 검색 후 취소버튼 클릭시 한 지역 포커싱 취소
        this.goTo = false;
        this.searchQuery = null;
        if(this.beforeZoom < 5) this.initSdMapDrawing();
        // else if(this.beforeZoom == 5) this.initSggZoom5MapDrawing();
        else if(this.beforeZoom > 5) this.initSggMapDrawing();
      }
    },
    setToInitMap() {
      this.targetLocation = null;
      this.naverMap.updateBy(new naver.maps.LatLng(this.firstMapLat, this.firstMapLng), this.zoom);
      this.initLegendDot();
    },
    initUserLocationMarker() {
      this.userLocationMarker = new naver.maps.Marker({
        visible: false,
        position: this.getUserLocation,
        map: this.naverMap,
        zIndex: 10
      });
    },
    showLocationError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
            this.$toasted.error("위치정보 공유를 허가해야 사용가능합니다.")
            break;
        case error.POSITION_UNAVAILABLE:
            this.$toasted.error("위치정보를 이용할 수 없습니다.")
            break;
        case error.TIMEOUT:
            this.$toasted.error("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            this.$toasted.error("An unknown error occurred.")
            break;
      }
    },
    setToUserLocation() {
      // set 유저 현위치정보
      this.isLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.getUserLocation = new naver.maps.LatLng(lat,lng);

        if(this.getUserLocation) {
          
          this.userLocationMarker.setVisible(true)
          const x = this.getUserLocation.x - 0.05
          const y = this.getUserLocation.y
          this.naverMap.updateBy({x,y}, 7);
          // this.naverMap.panToBounds(this.getUserLocation,{}, this.panToBoundsOptions);
          // this.naverMap.morph({x,y}, 8, this.panToBoundsOptions);
          naver.maps.Service.reverseGeocode({
              location: this.getUserLocation,
          }, (status, response) => {
            if (status !== naver.maps.Service.Status.OK) {
              return alert('GPS Something wrong!');
            }

            var result = response.result, // 검색 결과의 컨테이너
                items = result.items; // 검색 결과의 배열
            const SD_NM = items[0].addrdetail.sido;
            const SGG_NM = items[0].addrdetail.sigugun
            console.log("response : ", response)
            this.axios
              .get("/districts/sgg/search", {params: {SD_NM, SGG_NM}})
              .then(res => {
                console.log('userlocation res.data : ', res.data)
                this.goToLocation(res.data.result.SGG_CD)
              });
            // this.axios
            //   .get("/districts/certain", {params: {date: this.date, SD_NM, SGG_NM}})
            //   .then(res => {
            //     if(res.data.result) {
            //       this.targetLocation = {}
            
            //       this.GetTargetLocationData.forEach((t)=>{
            //         this.targetLocation[t] = res.data.result[t];
            //       })
            //       this.targetLocation.sigungu_cd = res.data.result.SGG_CD; // 시군구, 시도 properity 명을 통일하지 않아서 생긴 오류
            //       this.targetLocation.sigungu_nm = res.data.result.SGG_NM; // 시군구, 시도 properity 명을 통일하지 않아서 생긴 오류

            //       this.sideMenu = true;
            //       this.isLoading = false;
            //     } else {
            //       this.$toasted.info("결과가 없습니다.")
            //     }
            //   })
          });
        } else {
          this.isLoading = false;
          return this.$toasted.info("위치정보 접근을 허용하셔야합니다.")
        }
      }, this.showLocationError)
    },
    onChangeAirPolDataFilter(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        this.airPolTopic = data;
        this.addrTopic = false;
        this.naverMap.data.setStyle((feature) => {
          
          let styleOptions = {
              fillColor: feature.airPolMainColor,
              fillOpacity: 0.8,
              strokeOpacity: 0.4,
          };
          return styleOptions;
        });
        resolve()
      }).then(res => {
        this.isLoading = false;
      }).catch((err) => {
        console.log('then error : ', err); // then error :  Error: Error in then()
      });
    },
    onChangeAddrDataFilter(airPol, addr) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        this.airPolTopic = airPol;
        this.addrTopic = addr;

        this.naverMap.data.forEach((feature) => {
          if(this.naverMap.getZoom() > 3 ) {
            if(feature.mapMarker) return feature.mapMarker.setVisible(true)
          } else {
            if(feature.mapMarker) return feature.mapMarker.setVisible(true)
          }
        });
        resolve();
      }).then(res => {
        this.isLoading = false;
      }).catch((err) => {
        console.log('then error : ', err); // then error :  Error: Error in then()
      });
    },
    turnOffAirPolMap () {
      this.naverMap.data.setStyle((feature) => {
        let styleOptions = {
          fillOpacity: 0,
          // strokeOpacity: 0
        }
        return styleOptions;
      });
    },
    turnOffAddrMap () {
      this.naverMap.data.setStyle((feature) => {
        if(feature.mapMarker) feature.mapMarker.setVisible(false);
        else feature.mapMarker.setVisible(false);
      });
    },
    whoStandardChange() {
      this.whoStandard = !this.whoStandard
      
      const viewIcon = this.beforeZoom > 5 ? '' : '<img class="view" src="https://png.icons8.com/material-outlined/80/000000/search.png">'
      this.naverMap.data.forEach(feature => {
        // 마커 그리기(who 기준 or 건강영향도)
        this.drawMarker(feature);
      });
    },
    setMarkerPoint(feature) {
      // 초과사망자수 마커 위치설정
      if(feature.property_SIDO_NM) {
        let point = feature.bounds.getCenter(); 
        switch (feature.property_SIDO_NM) {
          case "경기도":
            point.x += 0.35;
            point.y += 0.3;
            break;
          case "강원도":
            point.x += 0.2;
            point.y += 0.3;
            break;
          case "인천광역시":
            point.x += 0.2;
            point.y += 0.3;
            break;
          case "서울특별시":
            point.x -= 0.3;
            point.y += 0.4;
            break;
          case "충청북도":
            point.x += 0.1;
            point.y += 0.4;
            break;
          case "충청남도":
            point.x -= 0.95;
            point.y += 0.2;
            break;
          case "세종특별자치시":
            point.x -= 0.4;
            point.y += 0.3;
            break;
          case "대전광역시":
            point.y -= 0.2;
            break;
          case "경상북도":
            point.x -= 0.1;
            point.y += 0.4;
            break;
          case "경상남도":
            point.x -= 0.35;
            break;
          case "대구광역시":
            point.y += 0.3;
            break;
          case "울산광역시":
            point.x += 0.45;
            point.y += 0.2;
            break;
          case "부산광역시":
            point.y -= 0.1;
            break;
          case "전라남도":
            point.x -= 0.4;
            break;
          case "전라북도":
            point.x -= 0.55;
            point.y += 0.2;
            break;
          case "광주광역시":
            point.x += 0.1;
            point.y -= 0.1;
            break;
        }
        return point;
      } 
      // else if(feature.property_sigungu_nm)  {
      //   let point = feature.bounds.getCenter();
      //   switch (feature.property_sigungu_nm) {
      //     case "북구":
      //       point.y += 0.05;
      //       break;
      //     case "중구":
      //       point.x -= 0.05
      //       point.y += 0.05
      //       break;
      //     case "진해구":
      //       point.x += 0.05
      //       break;
      //     case "마산합포구":
      //       point.y -= 0.05
      //       break;
      //     case "의창구":
      //       point.y += 0.05
      //       break;
      //     case "담양군":
      //       point.x += 0.05
      //       break;
      //     case "남구":
      //       point.y -= 0.05
      //       break;
      //   }
      //   return point;
      // }
    },
    drawMarker(feature) {
      const position = this.setMarkerPoint(feature);

      if(!feature.mapMarker) feature.mapMarker = new naver.maps.Marker({})
      const viewIcon = this.beforeZoom > 5 ? '' : '<img class="view" src="https://png.icons8.com/material-outlined/80/000000/search.png">'
      if(!this.whoStandard) {
        feature.mapMarker.setOptions({
          position,
          map: this.naverMap,
          icon: {
            content: 
              "<div class='mapMarker'>" +
                "<div class='mapMarkerlabelWrapper text-center'>" +
                  `<p class='label top-label sd_nm'>` + (feature.property_SIDO_NM ? this.$options.filters.district_nm_filter(feature.property_SIDO_NM) : feature.property_sigungu_nm) + "</p>" +
                "</div>" +
                '<svg class="donut" width="70" height="70" viewBox="0 0 42 42">' +
                  '<circle class="donut-hole" cx="21" cy="21" r="20" fill="#fff"></circle>' +
                  '<circle class="donut-ring" cx="21" cy="21" r="18" fill="transparent" stroke="#d2d3d4" stroke-width="1.5"></circle>' +
                  `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,198,255)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-85"></circle>` +
                  (feature.property_Index_total_PM10 > 1 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,143,195)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-95"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 2 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(0,90,142)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-105"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 3 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(252,255,8)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-115"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 4 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,197,6)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-125"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 5 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,144,47)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-135"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 6 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(255,91,93)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-145"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 7 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(253,0,7)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-155"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 8 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(197,0,8)" stroke-width="1.5" stroke-dasharray="9 102" stroke-dashoffset="-165"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 9 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(143,0,2)" stroke-width="1.5" stroke-dasharray="10 102" stroke-dashoffset="-176"></circle>` : "") +
                  (feature.property_Index_total_PM10 > 10 ? `<circle class="donut-segment" cx="21" cy="21" r="18" fill="transparent" stroke="rgb(92,3,1)" stroke-width="1.5" stroke-dasharray="9 103" stroke-dashoffset="-187"></circle>` : "") +
                '</svg>' + 
                "<div class='mapMarkerWrapperOver' style='background-color: initial;margin: auto;position: absolute;bottom: 25px;'>" + 
                  "<p class='inCurcle'>" + 
                    "<span class='title'>대기건강지수</span><br>" + 
                    "<span class='overdeath_value'>" + this.$options.filters.index_total_PM10_filter(feature.property_Index_total_PM10) + "</span><br>" +
                  "</p>" +
                "</div>" +
                "<div class='mapMarkerlabelWrapper text-center' style='margin-top: -6px;'>" +
                  "<p class='label bottom-label sd_nm'>" + Math.floor(feature.property_PM2_5) +  this.unitText(this.airPolTopic) + "</p>" +
                "</div>" +
              "</div>",
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          }
        });
      } else {
        const pm2_5 = Math.floor(feature.property_PM2_5) - 25 < 0 ? 0 : Math.floor(feature.property_PM2_5) - 25 * feature.property_OverallDeath

        feature.mapMarker.setOptions({
          position,
          map: this.naverMap,
          icon: {
            content: 
              "<div class='mapMarker'" +
                "<div class='mapMarkerlabelWrapper text-center'>" +
                  "<p class='label top-label sd_nm'>" + (feature.property_sigungu_nm || feature.property_SIDO_NM) + "</p>" +
                "</div>" +
                "<div class='mapMarkerWrapperOver' style='background-color: white;margin: auto;'>" + 
                  "<p class='inCurcle'>" + 
                    "<span class='title'>건강영향도</span><br>" + 
                    "<span class='overdeath_value' style='color:tomato;'>" + pm2_5 + "명</span><br>" +
                    // viewIcon +
                    // '<img class="warning" src="https://img.icons8.com/material-sharp/48/c02b1f/error.png">' +
                    // '<span style="color: gray; font-size:13px;">' + (feature.property_OverallDeathBeta).toFixed(3) + '</span>' +
                  "</p>" +
                "</div>" +
                "<div class='mapMarkerlabelWrapper text-center'>" +
                  // "<p class='label sd_nm'>" + (feature.property_sigungu_nm || feature.property_SIDO_NM) + "</p>" +
                  "<p class='label bottom-label sd_nm'>" + Math.floor(feature.property_PM2_5) +  this.unitText(this.airPolTopic) + "</p>" +
                "</div>" +
              "</div>",
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          }
        });
      }
      // // 초과사망자수 마커 pointer-events none 설정
      // const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
      // if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.parentNode.style["pointer-events"] = "none";
    },
  }
}
</script>
