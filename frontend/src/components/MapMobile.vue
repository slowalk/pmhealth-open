<template lang="pug">    
  div.mapMobile
    main-nav
    .right-search-box(@click="toggleSearch = !toggleSearch")
      font-awesome-icon.cancelBtn(icon="search" color="rgb(17,133,240)")
    //- nav.navbar.navbar-expand-lg.bg-white.mapNav
      b-container(fluid)
        b-nav-form
          b-navbar-brand.logo-text(href="/map") 미세먼지 대기건강지수
        .page-wrapper
          ul.navbar-nav
            img.menu(src="https://img.icons8.com/material-rounded/48/000000/menu.png" @click="menuToggle = !menuToggle")
        .right-search-box(@click="toggleSearch = !toggleSearch")
          font-awesome-icon.cancelBtn(icon="search" color="rgb(17,133,240)")
    .search-box(v-if="toggleSearch")
      .district-search-box-wrapper
        .turn-back(@click.prevent="toggleSearch = !toggleSearch")
          i.fa.fa-angle-left
        .input-group
          input.form-control.searchBox(style='padding: 0.26rem;padding-left: 0.6rem;' type="text" class="form-control" placeholder="원하시는 지역의 대기건강지수를 알아보세요!" v-model="searchQuery" @keyup.enter.prevent="searchLocation()" @keyup.esc="searchList=null")
          img.inputClear(v-if="searchQuery" src="https://png.icons8.com/ios/48/000000/cancel.png" @click="onSearchCancel")
          //- img.seachCancelBtn(src="https://img.icons8.com/ios/50/000000/cancel.png" v-bind:class="{hide: searchQuery == null}" @click="searchQuery = null; searchList=null;")
          //- .input-group-append(style="display: inline-block;")
            button.btn.btn-secondary.main-bg-color.searchBtn(type="submit" @click.prevent="searchLocation()"  @blur="searchList=null")
              i.fa.fa-search
        .search-icon(@click="searchLocation()")
          i.fa.fa-search
      .district-select-wrapper(:class="{hide: searchList.length > 0}")
        p.mb-1
          small 시/도 단위 선택
        b-form-select(v-model="selected.sido" :options="options.sido" class="mb-3" @change.native="searchBySd")
          template(slot="first")
            option(:value="null", disabled) 시도
        p.mb-1
          small 시/군/구 단위 선택
        b-form-select(v-model="selected.sigungu" :options="options.sigungu" class="mb-3")
          template(slot="first")
            option(:value="null", disabled) 시군구
        .btn-select-wrapper
          a.btn-select(href="#" @click.prevent="goToLocation(selected.sigungu || selected.sido + '000')") 선택하기
      .searchList(v-if='searchList')
        a.searchList-item.searchList-item-action(href="#" @click.prevent="goToLocation(sl.SGG_CD)" v-for='sl in searchList') 
          font-awesome-icon.mr-2(icon="search" color="gray")
          | {{sl.SD_NM}} {{sl.SGG_NM == sl.SD_NM ? "" : sl.SGG_NM}}
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
    
    // 정보창 - 모바일 뷰
    .infoBgWrapper.dp-none-mobile(v-bind:class="{hide : targetLocation == null}" @click="cancelDetail()")
    //- #airpolLegendWrapper(v-if="isMobile()")
      .titleWrapper
        p.mb-0 
          b 미세먼지 농도
        p.mb-0
          span (단위 : ㎍/㎥)
      svg#airpolLegend
    .bottomInfo.dp-none-nomobile(:class="{hide : targetLocation == null, detail: viewDetail}")
      
      .toggle-btn-wrapper
        .toggle-btn(:class="{detail: viewDetail}" @click="toggleViewDetail()")
          font-awesome-icon(:icon="viewDetail ? 'chevron-down' : 'chevron-up'")
      .content-wrapper
        .header
          p.main-district(v-if="targetLocation") {{targetLocation.SIDO_NM || sggCDtoSdCD}} {{targetLocation.sigungu_nm}}
          .air-health-effect-wrapper
            p.label 대기건강지수
            air-health-effect-mobile.air-health-effect-mobile(:onLegendRange="false" :target-location="targetLocation" ref="leftMenu" :target-id="'leftMenu'" :on-dot="true")
          .real-time-label-wrapper
            .real-time-label
              .label-wrapper
                p.label.mb-0 실시간 미세먼지 농도
              .value-wrapper
                p.label 
                  | PM
                  sub 2.5
                p.value {{realTimeData.pm2_5}}㎍/㎥
                p.label 
                  | PM
                  sub 10
                p.value {{realTimeData.pm10}}㎍/㎥
                p.label NO
                  sub 2
                p.value {{realTimeData.no2}}㎍/㎥
        .banner-menu-wrapper(v-bind:class="{hide : !viewDetail}")
          .scorll-wrapper
            p.banner-item(@click="onBannerFineDustAvg()" :class="{active: bannerMenu=='fineDustAvg'}") 월평균 미세먼지 농도
            p.banner-item(@click="onBannerIndexTotalPm10()" :class="{active: bannerMenu=='IndexTotalPm10'}") 대기건강지수
            p.banner-item(@click="bannerMenu = 'overallDeath'" :class="{active: bannerMenu=='overallDeath'}") 초과사망자수
            p.banner-item(@click="bannerMenu = 'actionMenual'" :class="{active: bannerMenu=='actionMenual'}") 행동요령
        .items-wrapper(v-bind:class="{hide : !viewDetail}")
          .item(:class="{hide: bannerMenu!='fineDustAvg'}")
            .data-item
              br
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
            br
            .data-item
              p.mb-2.title 
                b 이번달 미세먼지농도 평균
              p.mb-0 우리 지역의 월별 대기건강지수를 보여주는 그래프입니다. 대기건강지수로 이번 달 우리 지역의 대기 오염이 단기적 건
            .legendWrapper
              svg#airpolLegend(style="width:100%;")

          .item(:class="{hide: bannerMenu!='IndexTotalPm10'}")
            .data-item
              br
              p.mb-2.title 
                b 대기건강지수
              p.mb-2 우리 지역의 월별 대기건강지수를 보여주는 그래프입니다. 대기건강지수로 이번 달 우리 지역의 대기 오염이 단기적 건강위험의 크기를 알 수 있습니다.
              router-link.link(to="/info/how/airhealthindex") 대기건강지수란 무엇인가요?
            br
            .data-item
              p.mb-2 
                b *지역별 건강영향도 순위가 궁금한가요?
              p.mb-2 우리 지역의 대기건강지수를 보여주는 그래프입니다.
              router-link.link(to="/info/how/airhealthindex") 대기건강지수는 어떻게 계산하나요?
              .air-health-effect-wrapper.mt-3
                air-health-effect-mobile(:target-location="targetLocation" ref="indexTotalPm10Banner" :target-id="'indexTotalPm10Banner'" :on-dot="false" :onLegendRange="true")
              br
              .graph-wrapper.mt-0
                .legend-wrapper 
                  .color-box 
                  p 대기건강지수
                #air-health-effect-graph
          .item(:class="{hide: bannerMenu!='overallDeath'}")
            br
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
                .mb-0
                  .img-item-wrapper
                    img(src="../img/heart.png")
                  .img-label-wrapper
                    p.label 심뇌혈관질환자
                    p.value {{targetLocation.CerebralBloodVesselOverallDeath || "-"}}
                .mb-0
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
          .item.action-menual(:class="{hide: bannerMenu!='actionMenual'}")
            br
            p.action-title.mb-3
              b 미세먼지 행동요령
            .menual-table-wrapper
              menual-table
          
    // 시도 선택시 시군구 리스트 툴팁
    .selectedDistrictsTooltipWrapper
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
                //- .text-center
                  p.mb-2 {{i | index_total_PM10_filter}}
            p.value-label.mb-0 {{d[date] | index_total_PM10_filter}}
    .target-map-wrapper
      #targetMap(ref="targetMap")
      //- .leftLegend.dp-none-mobile
        img(src="https://img.icons8.com/material-sharp/48/c02b1f/error.png")
        span.title 상대위험도&nbsp;
        span.sign (%)
    
    //- button.toolBtn.border-round(ref="resetBtn" href="#" @click.prevent="setToInitMap()" ) 
      img(src="https://png.icons8.com/android/40/000000/expand.png")
    //- button.toolBtn.border-round(ref="resetBtn" href="#" @click.prevent="setToInitMap()" ) 
    //-   img(src="https://img.icons8.com/ios/30/000000/sorting-options-filled.png")
      
    button.toolBtn.border-round#userLocationBtn(ref="userLocationBtn" href="#" @click.prevent="setToUserLocation()" ) 
      img(src="https://img.icons8.com/ios-glyphs/30/000000/center-direction.png")


    //- 줌 컨트롤러
    #zoomControl(ref="zoomControl")

    //- //- 스위치 
    //- #valueToggleBtn(ref="valueToggleBtn")
      button.toolBtn.border-round( href="#" @click.prevent="toggleFilter()" ) 
        img(src="https://img.icons8.com/ios/30/000000/sorting-options-filled.png")
      .switchWrapper.mt-2(v-if="!isMobile()" v-bind:class="{hide: !filterBtn}")
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
    // 모바일 토글버튼
    .infoBgWrapper(v-bind:class="{hide : !filterBtn}" @click="filterBtn = false")
    .mobileSwitchWrapper
      .list.pt-1
        p.text-center.mb-0
          b 미세먼지 농도
        .labelWrapper.text-center
          label.onoffbtn(v-bind:class="{active: airPolToggle}")
            input(type="checkbox" v-bind:class="{active: airPolToggle}" checked @click="toggleFilterSwitch('airpol')")
          
      //- .list.pt-1
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
    .dp-none-mobile(ref="monthPickerControl")  
      button.toolBtn.month-select-btn
        .select
          img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" @click="changeDateFilter('month', -1)")
          span &nbsp;{{selected.month}}월&nbsp;
          img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" @click="changeDateFilter('month', 1)")
  
</template>

<style lang="scss">
  @import 'billboard.js/dist/theme/insight.min.css';
  @import '../style/map.scss';
  
  .mapMobile {
    .menual-table-wrapper {
      overflow-x: scroll;
    }
    .action-title {
      font-size: 18px;
    }
    #userLocationBtn {
      border-radius: 6px;
      position: fixed;
      bottom: 15px;
      right: 15px;
    }
    .searchBtn {
      height: 100%;
    }
    #airpolLegendWrapper {
      position:absolute;
      padding: 5px 10px;
      width: 205px;
      top: 55px;
      right: 10px;
      z-index: 100;
      font-size: 14px;
      background-color:white;
      .titleWrapper{
        margin-left: 5px;
        p {
          display: inline-block;
          width: 50%;
          &:last-child {
            text-align: right;
            padding-right: 5px;
          }
        }
      }
      #airpolLegend {
        width: 100%;
        height: 80px;
      }
    }
    .toolBtn {
      font-weight: 700;
      cursor: pointer;
      background: white;
      font-size: 13px;
      border: none !important;
      padding: 7px;
      .date {
        margin-left: 5px;
        margin-right: 10px;
      }
      &.border-round {
        border-radius: 50%;
      }
      img{
        height: 25px !important;
        width: 25px !important;
        // width: 18px;
        vertical-align: top;
      }
    }
    .mobileSwitchWrapper {
      width: 160px;
      top: 55px;
      font-size: 14px;
      position: fixed;
      background-color: white;
      right: 15px;
      // z-index: 110;
      border-radius: 7px;
      p {
        display: inline-block;
        vertical-align: baseline;
        margin-right: 5px;
        font-size: 14px;
      }
      .list {
        text-align: center;
        padding: 5px 10px;
        font-size: 16px;
        span {
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .labelWrapper{
        display: inline-block;
        vertical-align: bottom;
        .onoffbtn{
          // margin-top: 5px;
          width: 40px;
          height: 22px;
          border-radius:15px;
          // background: #bbbbbb none repeat scroll 0 0;
          background: white none repeat scroll 0 0;
          border: 1px solid rgb(192,43,31);
          display:block;
          position:relative;
          margin-bottom: 0px;
          cursor: pointer;
          &.active {
            border:1px solid rgb(17,133,240);
            -moz-transition: all 0.3s ease-in 0s;
            -webkit-transition: all 0.3s ease-in 0s;
            -o-transition: all 0.3s ease-in 0s;
            transition: all 0.3s ease-in 0s;
            background-color: rgb(17,133,240);
          }

        }
        .onoffbtn:after{
          position:absolute;
          height: 18px;
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
          left:100%;
          margin-left:-17px;
          background-color: white;
          // content:'on';
          input {
            border: 1px solid rgb(17,133,240);
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
    .infoBgWrapper { 
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      background-color: rgba(70,70,70,0.8);
      z-index: 105;
    }
    .bottom-breif-info {
      position: absolute;
      font-size: 13px;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 250px;
      z-index: 110;
      background: white;
    }
    .bottomInfo {
      max-height: calc(100vh - 47px);
      position: fixed;
      // overflow-y: scroll;
      font-size: 13px;
      bottom: 0px;
      left: 0px;
      width: 100%;
      z-index: 110;
      &.detail {
        bottom: initial !important;
        top: 47px;
        width: 100% !important;
        border-radius: 0px !important;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          background-color: white;
        }
      }
      .content-wrapper {
        background-color: white;
        // overflow-y: scroll;
      }
      .toggle-btn-wrapper {
        z-index: 999;
        // position: fixed !important;
        // margin-top: -35px;
        width: 100%;
        text-align: center;
        pointer-events: none;
        .toggle-btn {
          pointer-events: fill;
          &.detail {
            width: 100% !important;  
            border-top-left-radius: 0px !important;
            border-top-right-radius: 0px !important;
          }
          background: white;
          width: 90px;
          margin: auto;
          padding: 3px 0px;
          color: rgb(89,136,222);
          font-size: 17px;
          border-top-left-radius: 7px;
          border-top-right-radius: 7px;
        }
      }
      .header {
        padding: 15px;
        padding-bottom: 0px !important;
        background-color: white;
      }
      .bottom {
        padding: 15px;
        // background-color: rgb(101, 101, 104);
      }
      .main-district {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 0px;
      }
      .air-health-effect-wrapper {
        .label {
          display:inline-block;
          margin-right: 5px;
          margin-bottom: 0px;
          font-size: 11px;
        } 
        .air-health-effect-mobile {
          width:calc(100vw - 30px - 5px - 70px); 
          display:inline-block;
          vertical-align: middle;
          svg {height: 38px;}
        }
      }
      .real-time-label-wrapper {
        padding-bottom: 17px;
        overflow-x: auto;
        &::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 7px;
          height: 9px;
          display: none;
        }
        .real-time-label {
          width: 345px;
        }
        .label-wrapper {
          background-color: #d3e5f9;
          border-radius: 5px;
          display: inline-block;
          text-align: center;
          padding: 0px 3px;
          color: #1185f0;
          font-size: 11px;
          margin-right:4px;
          // width: 105px;
        }
        .value-wrapper {
          display: inline-block;
          font-size: 11px;
          text-align: center;
          // width: calc(100vw - 30px - 108px - 3px);
          // width: 230px;
          p {
            margin-bottom: 0px;
            display: inline-block;

            &.label {
              color: gray;
              margin-right: 3px;
            }
            &.value {
              margin-right: 5px;
              &:last-child {
                margin-right: 0px;
              }
            }
          }
        }
      }
      .banner-menu-wrapper {
        background-color: white;
        overflow-x: auto;
        border-top: 1px solid silver;
        &::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 0px;
          height: 0px;
        }
        // .scorll-wrapper {
        //   width: 400px;
        // }
        .banner-item {    
          padding: 10px 0px;
          margin: 0px 0.5rem;
          display: inline-block;
          font-size: 12.5px;
          &.active {
            font-weight: 800;
            border-bottom: 2px solid rgb(89,136,222);
          }
        }
      }
      .items-wrapper {
        padding-top: 20px;
        padding-left: 15px;
        padding-right: 15px;
        overflow: auto;
        background-color: rgb(245,246,251);
        .menual-table {
          width: 500px;
          background-color: white;
        }
        .data-item > .title { 
          font-size: 18px;
        }
        .data-item > .value {
          margin-bottom: 15px;
          font-size: 24px;
          color: #1185f0;
        }
        .data-item > .link {
          padding: 3px;
          border-bottom: 1px solid rgb(17,133,240);
        }
        .graph-wrapper {
          text-align: center;
          overflow-x: scroll;
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
    }
    .searchList {
      top: 45px !important;
      right: 0px;
      width: 100% !important; 
    }
    .inputClear {
      position: absolute;
      right: 0px;
      top: 0;
      bottom: 0;
      height: 14px;
      margin: auto;
      font-size: 18px;
      cursor: pointer;
      color: #ccc;
      z-index: 100;
    }
    .right-search-box {
      position: absolute;
      margin-right: 5px;
      font-size: 22px;
      z-index: 200;
      right: 8px;
      top: 6px;
    }
    .btn-select-wrapper {
      text-align: center;
      margin-top: 15px;
      .btn-select {
        cursor: pointer;
        color:black;
        padding: 12px 30px;
        text-align: center;
        height:40px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 3px 4px 0 silver;
      }
    }
    .menuDiv {
      left: 0px !important;
      right: initial !important;
    }
    .search-box {
      position: absolute;
      top:0px;
      left: 0px;
      width: 100%;
      height: 100vh;
      z-index: 200;
      background-color: white;
      .district-select-wrapper {
        background-color: #f5f6fb;
        padding: 30px 20px;
        min-height: calc(100vh - 40px);
      }
      .district-search-box-wrapper {
        margin: 5px 20px;
        .turn-back {
          width: 10%;
          display: inline-block;
          i {
            font-size: 30px;
            vertical-align: sub;
          }
        }
        .input-group {
          width: 80%;
          display: inline-block;
          input {
            width: 100%;
            font-size: 14px;
            border: none;
          }
        }
        .search-icon {
          text-align: right;
          width: 10%;
          display: inline-block;
          i {
            font-size: 22px;
          }
        }
      }
    }
    #air-health-effect-dot {
      height: 80px;
      width: 100%;
    }
    .detail-control-btn {
      border: 1px solid silver;
      margin-bottom: 20px;
      width: 160px;
      height: 40px;
      vertical-align: middle;
    }
    .data-item {
      margin-bottom: 30px;
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
        // width: 185px !important;
        width: calc(100vw - 185px) !important;
        .step {
          height: 10px;
        }
      }
      // &:before {
      //     content: '';
      //     position: absolute;
      //     top: 15px;
      //     left: -20px;
      //     width: 0;
      //     height: 0;
      //     border: 30px solid transparent;
      //     border-right-color: white;
      //     border-top: 0px;
      //     margin-top: -15px;
      //     margin-left: -30px;
      //     z-index: 9999;
      // }
    }
    .month-select-btn {
      width: 120px;
      .left {
        float: left;
      }
      .right {
        float: right;
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
    .selectedDistrictsTooltipWrapper {
      position: fixed;
      left: 0px;
      bottom: 190px;
      width: 100%;
      padding: 3%;
      z-index: 100;
      .selectedDistrictsTooltip {
        width:100%;
        // min-width:340px;
        height: calc(100vh - 400px);
        border-radius: 10px;
        background-color: white;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 0px 20px 40px 20px;
        .tooltip-cancel-btn {
          text-align: right;
          cursor: pointer;
          padding: 10px 0px;
          img {
            border-radius: 50%;
            border: 1px solid silver;
            padding: 4px;
            width: 24px;
            margin-right: -15px;
          }
        }
        .value-label {
          display: inline-block;
          margin-left: 5px;
          color: black;
          font-size: 16px;
        }
        .item {
          margin-bottom: 5px;
          text-align: center;
          .badge-district {
            width: 80px;
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
    }
    // .left-side-bar {
    //   display: inline-block;
    //   position: relative;
    //   width: 600px;
    //   height: calc(100vh - 42px);
    //   vertical-align: top;
    //   overflow-y: scroll;
    // }
    .right-side-bar {
      padding: 20px 30px;
      display: inline-block;
      background-color: rgb(245,246,251);
      // width: calc(100% - 600px);
      width: 100%;
      height: calc(100vh - 42px);
      vertical-align: top;
      overflow-y: scroll;
      position: fixed;
      z-index: 999;
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
          svg {
            width: 100%;
          }
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
    .target-map-wrapper {
      position: fixed;
      top: 41px;
      width: 100%;
      height: calc(100vh - 42px);
      left: 0px;
    }
    #targetMap {
      display: inline-block;
      position: fixed;
      // width: calc(100% - 600px);
      width: 100%;
      height: calc(100vh - 42px);
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
      width: 195px;
      margin: 0px 5px;
      font-size: 14px;
      position: absolute;
      background-color: white;
      left: 0px;
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
      .labelWrapper{
        float: right;
        margin-top: 5px;
        .onoffbtn{
          // margin-top: 5px;
          width: 30px;
          height: 17px;
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
          height: 13px;
          width: 13px;
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
          left:100%;
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
    .toolBtn {
      .date {
        margin-left: 5px;
        margin-right: 10px;
      }
      font-weight: 700;
      &.border-round {
        border-radius: 50%;
      }
      img{
        height: 18px;
        width: 18px;
        vertical-align: top;
      }
    }
    .searchList {
      // position: absolute;
      top: 50px;
      background-color: white;
      z-index: 120;
      // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      width: 330px;
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
      // height: calc(100vh - 42px);
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
      .cancelDetail {
        background: none;
        // position: absolute;
        float: right;
        border: 1px solid silver;
        // right: 0;
        margin: 25px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 9999;
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
import AirHealthEffectMobile from './common/AirHealthEffectMobile';
import MenualTable from './common/MenualTable';
import Loading from 'vue-loading-overlay';

import {codeToSD} from "../models/sdVal.js"
import {bb} from 'billboard.js';

const sdVal = require("../models/sdVal")
const consumer_key = "29b193cec6074f9c8591"
const consumer_secret = "f7bc7a00687a4eae8378"

export default {
  components: {
      Loading,
      AirHealthEffectMobile,
      MenualTable
  },
  data() {
    return {
      goTo: false,
      realTimeData: {
        district: null,
        pm2_5: null,
        pm10: null,
        no2: null
      },
      beforeClickedFeature: null,
      beforeMarker: null,
      toggleSearch: false,
      menuToggle: false,
      viewDetail: false,
      selectedDistricts: [],
      infoBoxToggle: true,
      menuToggle: false,
      airPolToggle: true,
      addrToggle: true,
      isLoading: false,
      bannerMenu: "fineDustAvg",
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
      firstMapLng: 127.9,
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
      legendBarHeight: 40,
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
      Pm2_5Sd: null,
      Pm2_5Sgg: null,
      OverallDeathSd: null,
      OverallDeathSgg: null,
      Pm2_5SdStats: null,
      Pm2_5SggStats: null,
      OverallDeathSdStats: null,
      OverallDeathSggStats: null,
      districtStandard: "sd",
      selected: {
        // year: "2015",
        // month: "1"
        year: "월 평균",
        month: "1",
        sido: null,
        sigungu: null
      },
      options: {
        // year: ['2012','2013','2014','2015', '월 평균'],
        year: ["2015"],
        month: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        sido: [
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
        sigungu: []
      },
      monthPickerBtn: false,
      legendDotMarginLeft: 5,
      legendDotMarginTop: 30,
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
      // selectedDistrictsTooltip: new naver.maps.InfoWindow(),
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
    this.legendRectBoundsWidth  = window.innerWidth - 50;
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


    // this.selectedDistrictsTooltip.setOptions({
    //   content: this.$refs.selectedDistrictsTooltip,
    //   position: {x: 128, y: 37},
    //   disableAnchor: true
    // });

    // // 변수 토글 스위치
    // const valueToggleBtn = this.$refs.valueToggleBtn;
    // if(!this.isMobile()) this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(valueToggleBtn);
    // else this.naverMap.controls[naver.maps.Position.BOTTOM_RIGHT].push(valueToggleBtn);

    // // 유저위치 컨트롤 버튼 추가
    // const userLocationBtn = this.$refs.userLocationBtn;
    // this.naverMap.controls[naver.maps.Position.BOTTOM_RIGHT].push(userLocationBtn);
    
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
    onSearchCancel() {
      this.searchQuery = null;
      this.searchList = []
    },
    searchBySd(evt){
      this.selected.sido = evt.target.value;
      // this.selected.district.sgg_cd = evt.target.value + "000";
      this.selected.sigungu = null;
      // this.selected.sido.sd_nm = this.options.sido[event.target.options.selectedIndex].text;
      // this.selected.district.sgg_nm = this.options.sido[event.target.options.selectedIndex].text;
      
      // console.log("this.options.sido[event.target.options.selectedIndex].text : ", this.options.sido[event.target.options.selectedIndex].text)
      // let checkSidoSelected = this.options.allSigungu.find(e => {return e.sgg_cd == this.selected.district.sgg_cd;});
      // this.selected.district.sd_nm = checkSidoSelected.sd_nm
      // if(checkSidoSelected) this.options.sigungu = checkSidoSelected.sggs;

      // this.getSgg(this.selected.district.sd_cd)
      //     .then(()=> {
      //       this.drawGraphBySd();
      //     })

      this.axios
        .get("/districts/list", {params: {SD_CD: this.selected.sido}})
        .then(res=>{
          this.options.sigungu = res.data.result.map(r => {return {value: r.SGG_CD, text: r.SGG_NM}});
        })
        .catch(err=>console.log("err : ", err))
    },
    searchBySgg(evt) {
      if(!evt.target.value) return false;
      this.selected.district.sgg_cd = evt.target.value;
      this.selected.district.sgg_nm = this.options.sigungu[event.target.options.selectedIndex - 1].text

      this.drawGraphBySgg();
    },
    toggleViewDetail() {
      this.viewDetail = !this.viewDetail
      if(!this.viewDetail) return false
      else if(this.bannerMenu == 'fineDustAvg') return this.onBannerFineDustAvg();
      else if(this.bannerMenu == 'IndexTotalPm10') return this.onBannerIndexTotalPm10();
    },
    onBannerFineDustAvg() {
      this.bannerMenu = 'fineDustAvg'
      this.onMonthDustAverageGrapth();
      let stat;
      if(this.targetLocation.SIDO_CD) stat = this.Pm2_5SdStats
      else stat = this.Pm2_5SggStats
      let airPolMin = Math.floor(stat.min[this.date]);
      let airPolMax = Math.ceil(stat.max[this.date]);
      return new Promise((resolve, reject)=>{
        this.createAirPolD3Legend(airPolMin, airPolMax, "#airpolLegend");
        resolve();
      })
      .then(()=>{
        this.setLegendDot(this.targetLocation.PM2_5, airPolMax);
      })
      .catch(err=>console.log("err : ", err))
    },
    onBannerIndexTotalPm10() {
      this.bannerMenu = 'IndexTotalPm10';
      this.onAirHealthEffectGrapth();
      this.$refs.indexTotalPm10Banner.setAirHealthEffect();
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
                width: this.targetLocation.sigungu_cd ? 900 : 450,
                height: query.SD_CD == "31" ? 400 : 200
              },
              padding: {
                // left: 60,
                right: 20,
                top: 30,
                bottom: query.SD_CD == "31" ? 60 : 20 
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
                    centered: true,
                    // values: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
                  }
                },
              },
              size: {
                // width: 450,
                height: 250
              },
              padding: {
                // left: 60,
                right: 20,
                bottom: 30,
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
            // if(this.selectedDistrictsTooltip) this.selectedDistrictsTooltip.close();
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
            // this.selectedDistrictsTooltip.open(this.naverMap, point);
            // document.querySelector(".selectedDistrictsTooltip").parentNode.classList.add("selectedDistrictsTooltipWrapper")
            // document.querySelector(".selectedDistrictsTooltip").parentNode.parentNode.style = ""
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

          // // tooltip용 마커 pointer-events none 설정
          // const aptm = document.querySelectorAll(".airPolTooltipMarker");
          // if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

          // 마커 그리기(who 기준 or 건강영향도)
          this.drawMarker(feature);

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
            
            if(this.beforeClickedFeature) {
              this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
                strokeColor: '#555',
                strokeWeight: 2
              });
            }
            this.naverMap.data.overrideStyle(feature, {
              strokeColor: '#000',
              strokeWeight: 4
            });
            this.beforeClickedFeature = feature;

            this.searchSggsSelectedTooltip(feature);
            this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
          });

          naver.maps.Event.addListener(feature.mapMarker, 'click', (e) => {
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
            
            if(this.beforeClickedFeature) {
              this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
                strokeColor: '#555',
                strokeWeight: 2
              });
            }
            this.naverMap.data.overrideStyle(feature, {
              strokeColor: '#000',
              strokeWeight: 4
            });
            this.beforeClickedFeature = feature;

            this.searchSggsSelectedTooltip(feature);
            this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
          });

          naver.maps.Event.addListener(feature.mapMarker, 'mouseover', (e) => {
            this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
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
            // if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
          });

          naver.maps.Event.addListener(feature, 'mouseout', (e) => { 
            this.naverMap.data.overrideStyle(feature, {
              strokeWeight: 2
            });
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
    changeSggMapDrawing() {
      // 지도 초기화
      this.naverMap.data.setStyle((feature) => {
        if(feature.property_SIDO_NM) return null
        if(feature.property_group) return false;
        if(feature.property_sigungu_nm == "울릉군") return null

        let targetPm2_5Sgg = this.Pm2_5Sgg.find(r => {return String(r["SGG_CD"]) == feature.property_sigungu_cd });
        let targetOverallDeathSgg = this.OverallDeathSgg.find(r => {return String(r["SGG_CD"]) == feature.property_sigungu_cd });
      
        feature.property_PM2_5 = targetPm2_5Sgg[this.date];
        feature.property_OverallDeath = targetOverallDeathSgg[this.date];
        feature.property_sigungu_cd = targetOverallDeathSgg.SGG_CD;
        feature.property_sigungu_nm = targetOverallDeathSgg.SGG_NM;

        // // 미세먼지 농도 Tooltip용 마커
        // feature.airPolTooltipMarker.setVisible(false)
        
        // // Tooltip용 마커 pointer-events none 설정
        // const aptm = document.querySelectorAll(".airPolTooltipMarker");
        // if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

        //// airPol 색깔 및 css 옵션 설정
        let qfc = this.airPolD3Linear(feature.property_PM2_5)
        feature.airPolMainColor = qfc;
        
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
        if(feature.property_SIDO_NM) return null
        if(feature.property_group) return false;
        if(feature.property_sigungu_nm == "울릉군") return null
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 4
        });
        // if(this.airPolToggle) {
          
        //   // let tooltipValue = Math.floor(feature.locationData.pm2_5[this.date]) + this.unitText(this.airPolTopic);
          
        //   let x = feature.bounds.getCenter().x + 0.06;
        //   let y = feature.bounds.getCenter().y + 0.06;

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
        //   })
        // }
      });

      this.naverMap.data.addListener('mouseout', (e) => {
        let feature = e.feature;
        if(feature.property_SIDO_NM) return null
        if(feature.property_group) return false;
        if(feature.property_sigungu_nm == "울릉군") return null
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 2
        });
        // if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
      });

      this.naverMap.data.addListener('click', (e) => {
        if(!this.sideMenu) this.sideMenu = true;
        let feature = e.feature;
        
        if(feature.property_SIDO_NM) return null
        if(feature.property_group) return false;
        if(feature.property_sigungu_nm == "울릉군") return null

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
        
        if(this.beforeClickedFeature) {
          this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
            strokeColor: '#555',
            strokeWeight: 2
          });
        }
        this.naverMap.data.overrideStyle(feature, {
          strokeColor: '#000',
          strokeWeight: 4
        });
        this.beforeClickedFeature = feature;
        // this.naverMap.panToBounds(feature.bounds,{}, this.panToBoundsOptions);
        // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
      });

    },
    initSggZoom5MapDrawing() { // zoom 5일 걍우 그룹지역만
      // // airpol 범례 추가
      // let airPolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
      // let airPolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
      // this.createAirPolD3Legend(airPolMin, airPolMax, "#airpolLegend");

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

            if(this.beforeClickedFeature) {
              this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
                strokeColor: '#555',
                strokeWeight: 2
              });
            }
            this.naverMap.data.overrideStyle(feature, {
              strokeColor: '#000',
              strokeWeight: 4
            });
            this.beforeClickedFeature = feature;
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
  
        if(this.beforeClickedFeature) {
          this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
            strokeColor: '#555',
            strokeWeight: 2
          });
        }
        this.naverMap.data.overrideStyle(feature, {
          strokeColor: '#000',
          strokeWeight: 4
        });
        this.beforeClickedFeature = feature;

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
      this.naverMap.addListener('center_changed', () => {
        const center = this.naverMap.getCenter();
        this.mapOptions.center = center;
        const ne = this.naverMap.getBounds().getNE();
        if(this.beforeZoom < 5) this.initSdMap();
        // else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        else if(this.beforeZoom > 5) this.initSggMap();
      });
    },

    initSggMapDrawing() { // zoom 5일 걍우 그룹지역만
      this.naverMap.data.setStyle((feature) => {
        if(!feature.bounds) return false;

        // targetLocation이 이미 있으면 정보만 업데이트
        let strokeOp = 2, strokeCo = "#555"
        if(this.targetLocation && this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {
          this.targetLocation = {}
            
          this.GetTargetLocationData.forEach((t)=>{
            this.targetLocation[t] = feature["property_" + t]
          })

          // if(this.beforeClickedFeature) {
          //   this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
          //     strokeColor: '#555',
          //     strokeWeight: 2
          //   });
          // }
          // this.naverMap.data.overrideStyle(feature, {
          //   strokeColor: '#000',
          //   strokeWeight: 4
          // });
          this.beforeClickedFeature = feature;
          strokeOp = 4;
          strokeCo = "#111";
        }

        // airPol 색깔 및 css 옵션 설정
        let qfc = this.airPolD3Linear(feature.property_PM2_5)
        feature.airPolMainColor = qfc
        
        let styleOptions = {
            fillColor: feature.airPolMainColor,
            fillOpacity: 0.8,
            strokeColor: strokeCo,
            strokeWeight: strokeOp,
            strokeOpacity: 0.4,
            strokeDasharray: 3
        };
        
        // 마커 그리기(who 기준 or 건강영향도)
        this.drawMarker(feature);

        naver.maps.Event.addListener(feature.mapMarker, 'click', (e) => {
          if(!this.sideMenu) this.sideMenu = true;
          
          this.targetLocation = {}
          
          this.GetTargetLocationData.forEach((t)=>{
            this.targetLocation[t] = feature["property_" + t]
          })

          // 클릭시 범례 dot 표시
          if(this.airPolToggle) {
            this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date])
            this.$refs.leftMenu.setAirHealthEffect(feature.property_Index_total_PM10);
          }

          if(this.beforeClickedFeature) {
            this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
              strokeColor: '#555',
              strokeWeight: 2
            });
          }
          this.naverMap.data.overrideStyle(feature, {
            strokeColor: '#000',
            strokeWeight: 4
          });
          this.beforeClickedFeature = feature;

          this.initSggOpenApiPm2_5({ 
            SGG_CD: feature.property_sigungu_cd,
            SGG_NM: feature.property_sigungu_nm,
            SD_CD: (feature.property_sigungu_cd).substring(0,2),
            SD_NM: codeToSD[(feature.property_sigungu_cd).substring(0,2)]
          });

          this.naverMap.fitBounds(feature.bounds);
        }); 


        // // 초과사망자수 마커 pointer-events none 설정
        // const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
        // if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

        return styleOptions;
      });

      this.naverMap.data.addListener('mouseover', (e) => {
        let feature = e.feature;
        
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 4
        });
      });

      this.naverMap.data.addListener('mouseout', (e) => {
        let feature = e.feature;
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 2
        });
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
        
        if(this.beforeClickedFeature) {
          this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
            strokeColor: '#555',
            strokeWeight: 2
          });
        }
        this.naverMap.data.overrideStyle(feature, {
          strokeColor: '#000',
          strokeWeight: 4
        });
        this.beforeClickedFeature = feature;

        this.initSggOpenApiPm2_5({ 
          SGG_CD: feature.property_sigungu_cd,
          SGG_NM: feature.property_sigungu_nm,
          SD_CD: (feature.property_sigungu_cd).substring(0,2),
          SD_NM: codeToSD[(feature.property_sigungu_cd).substring(0,2)]
        });

        this.naverMap.fitBounds(feature.bounds);
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
      this.naverMap.addListener('center_changed', () => {
        const center = this.naverMap.getCenter();
        this.mapOptions.center = center;
        const ne = this.naverMap.getBounds().getNE();
        if(this.beforeZoom < 5) this.initSdMap();
        // else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        else if(this.beforeZoom > 5) this.initSggMap();
      });
    },
    searchSdMapDrawing(code) {
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

              if(this.beforeClickedFeature) {
                this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
                  strokeColor: '#555',
                  strokeWeight: 2
                });
              }
              this.naverMap.data.overrideStyle(feature, {
                strokeColor: '#000',
                strokeWeight: 4
              });
              this.beforeClickedFeature = feature;

              this.initSdOpenApiPm2_5(feature.property_SIDO_CD);
            });

            naver.maps.Event.addListener(feature.mapMarker, 'mouseover', (e) => {
              this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
            });

            naver.maps.Event.addListener(feature.mapMarker, 'mouseout', (e) => { 
              this.naverMap.data.overrideStyle(feature, {
                strokeWeight: 2
              });
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
            
            if(this.beforeClickedFeature) {
              this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
                strokeColor: '#555',
                strokeWeight: 2
              });
            }
            this.naverMap.data.overrideStyle(feature, {
              strokeColor: '#000',
              strokeWeight: 4
            });
            this.beforeClickedFeature = feature;
            
            this.searchSggsSelectedTooltip(feature);
            initSdOpenApiPm2_5(feature.property_SIDO_CD)
          });

          naver.maps.Event.addListener(feature, 'mouseover', (e) => {
            this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
          });

          naver.maps.Event.addListener(feature, 'mouseout', (e) => { 
            this.naverMap.data.overrideStyle(feature, {
              strokeWeight: 2
            });
          });
        });

        // // 줌 변경시 지도 변경
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
      this.naverMap.data.setStyle((feature) => {
        if(!feature.bounds) return false;

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
          // this.naverMap.updateBy({x: center.x-0.05, y: center.y},this.beforeZoom)
          this.naverMap.fitBounds(feature.bounds)

          // 마커 그리기(who 기준 or 건강영향도)
          this.drawMarker(feature)
        }
      });

      this.naverMap.data.addListener('mouseover', (e) => {
        let feature = e.feature;
        
        this.naverMap.data.overrideStyle(feature, {
          strokeWeight: 4
        });
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
        
        if(this.beforeClickedFeature) {
          this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
            strokeColor: '#555',
            strokeWeight: 2
          });
        }
        this.naverMap.data.overrideStyle(feature, {
          strokeColor: '#000',
          strokeWeight: 4
        });
        this.beforeClickedFeature = feature;

        this.initSggOpenApiPm2_5({ 
          SGG_CD: feature.property_sigungu_cd,
          SGG_NM: feature.property_sigungu_nm,
          SD_CD: (feature.property_sigungu_cd).substring(0,2),
          SD_NM: codeToSD[(feature.property_sigungu_cd).substring(0,2)]
        });

        this.naverMap.fitBounds(feature.bounds);
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
      // 드래그 시
      this.naverMap.addListener('center_changed', () => {
        const center = this.naverMap.getCenter();
        this.mapOptions.center = center;
        const ne = this.naverMap.getBounds().getNE();
        if(this.beforeZoom < 5) this.initSdMap();
        // else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
        else if(this.beforeZoom > 5) this.initSggMap();
      });
    },
    pathRevertStyle(f) {
        if(this.clickedBeforePath) this.naverMap.data.revertStyle(this.clickedBeforePath);
        if(f) this.clickedBeforePath = f;
    },
    toggleFilterSwitch(target) {
      // this.pathRevertStyle();
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
    // setAirHealthEffectDot(value) {
    //   let arc = d3.svg.symbol().type('triangle-down').size(40);
    //   this.$nextTick(function () {
    //     const airHealthEffectDotWidth = this.$refs.airHealthEffectDotWidth.clientWidth;
    //     for(let i=0;i <= Array(10).length; i++) {
    //       d3.select(`#air-health-effect-dot g.step-${i+1}`)
    //         .attr("transform", `translate(${airHealthEffectDotWidth/11*i-i/2},12)`)
    //     }

    //     //- dot
    //     const legendDot = d3.select("#air-health-effect-dot .legend-dot")
    //       .attr("transform", `translate(${(value <= 10 ? value : 10.5) / 11 * airHealthEffectDotWidth },5)`)
    //     legendDot.select("path")
    //       .attr('d',arc)
    //       .attr('fill', "rgb(47,48,56)")
    //       .attr("transform", `translate(0,5)`);
    //     legendDot.select("line")
    //       .attr("x1", 0)
    //       .attr("y1", 28)
    //       .attr("x2", 0)
    //       .attr("y2", 5)
    //       .attr("stroke-width", 1)
    //       .attr("stroke", "rgb(47,48,56)");

    //     const StringWidth = 10, SpaceWidth = 5,
    //           group3 = airHealthEffectDotWidth/11*3-3/2,
    //           group1 = airHealthEffectDotWidth/11*1-1/2,
    //           LowGroupWidth = group3,
    //           NormalGroupWidth = group3,
    //           HighGroupWidth = group1,
    //           VeryHighGroupWidth = group3,
    //           SevereGroupWidth = group1;
              
    //     const legendRange = d3.select("#air-health-effect-dot g.legend-range")
    //                           .attr("transform", `translate(0,65)`),
    //           legendRangeLow = legendRange.select("g.low"),
    //           legendRangeNormal = legendRange.select("g.normal"),
    //           legendRangeHigh = legendRange.select("g.high"),
    //           legendRangeVeryHigh = legendRange.select("g.very-high"),
    //           legendRangeSevere = legendRange.select("g.severe");


    //     const LowGroupWidthHalf = LowGroupWidth/2;
    //     legendRangeLow.select("line.vt-line")
    //                   .attr("x1", 0)
    //                   .attr("x2", 0)
    //     legendRangeLow.select("line.hr-line-left")
    //                   .attr("x1", 0)
    //                   .attr("x2", LowGroupWidthHalf - StringWidth - SpaceWidth)
    //     legendRangeLow.select("text.value")
    //                   .attr("x", LowGroupWidthHalf)
    //     legendRangeLow.select("line.hr-line-right")
    //                   .attr("x1", LowGroupWidthHalf + StringWidth + SpaceWidth)
    //                   .attr("x2", LowGroupWidth)

    //     const Low_Normal = LowGroupWidth + NormalGroupWidth,
    //           Low_NormalGroupWidthHalf = LowGroupWidth + NormalGroupWidth/2;
    //     legendRangeNormal.select("line.vt-line")
    //                   .attr("x1", LowGroupWidth)
    //                   .attr("x2", LowGroupWidth)
    //     legendRangeNormal.select("line.hr-line-left")
    //                   .attr("x1", LowGroupWidth)
    //                   .attr("x2", Low_NormalGroupWidthHalf - StringWidth - SpaceWidth)
    //     legendRangeNormal.select("text.value")
    //                   .attr("x", Low_NormalGroupWidthHalf)
    //     legendRangeNormal.select("line.hr-line-right")
    //                   .attr("x1", Low_NormalGroupWidthHalf + StringWidth + SpaceWidth)
    //                   .attr("x2", Low_Normal)
        
    //     const Low_Normal_High = Low_Normal + HighGroupWidth,
    //           Low_Normal_HighGroupWidthHalf = Low_Normal + HighGroupWidth/2;
    //     legendRangeHigh.select("line.vt-line")
    //                   .attr("x1", Low_Normal)
    //                   .attr("x2", Low_Normal)
    //     legendRangeHigh.select("line.hr-line-left")
    //                   .attr("x1", Low_Normal)
    //                   .attr("x2", Low_Normal_HighGroupWidthHalf - StringWidth - SpaceWidth)
    //     legendRangeHigh.select("text.value")
    //                   .attr("x", Low_Normal_HighGroupWidthHalf)
    //     legendRangeHigh.select("line.hr-line-right")
    //                   .attr("x1", Low_Normal_HighGroupWidthHalf + StringWidth + SpaceWidth)
    //                   .attr("x2", Low_Normal_High)
          
    //     const Low_Normal_High_VeryHigh = Low_Normal_High + VeryHighGroupWidth,
    //           Low_Normal_High_VeryHighGroupWidthHalf = LowGroupWidth + NormalGroupWidth + HighGroupWidth + VeryHighGroupWidth/2;
    //     legendRangeVeryHigh.select("line.vt-line")
    //                   .attr("x1", Low_Normal_High)
    //                   .attr("x2", Low_Normal_High)
    //     legendRangeVeryHigh.select("line.hr-line-left")
    //                   .attr("x1", Low_Normal_High)
    //                   .attr("x2", Low_Normal_High_VeryHighGroupWidthHalf - StringWidth * 2 - SpaceWidth * 2)
    //     legendRangeVeryHigh.select("text.value")
    //                   .attr("x", Low_Normal_High_VeryHighGroupWidthHalf)
    //     legendRangeVeryHigh.select("line.hr-line-right")
    //                   .attr("x1", Low_Normal_High_VeryHighGroupWidthHalf + StringWidth * 2 + SpaceWidth * 2)
    //                   .attr("x2", Low_Normal_High_VeryHigh)

    //     const Low_Normal_High_VeryHigh_Severe = Low_Normal_High_VeryHigh + SevereGroupWidth,
    //           Low_Normal_High_VeryHigh_SevereGroupWidthHalf = LowGroupWidth + NormalGroupWidth + HighGroupWidth + VeryHighGroupWidth + SevereGroupWidth/2;
    //     legendRangeSevere.select("line.vt-line-left")
    //                   .attr("x1", Low_Normal_High_VeryHigh)
    //                   .attr("x2", Low_Normal_High_VeryHigh)
    //     legendRangeSevere.select("line.hr-line-left")
    //                   .attr("x1", Low_Normal_High_VeryHigh)
    //                   .attr("x2", Low_Normal_High_VeryHigh_SevereGroupWidthHalf - StringWidth - SpaceWidth)
    //     legendRangeSevere.select("text.value")
    //                   .attr("x", Low_Normal_High_VeryHigh_SevereGroupWidthHalf)
    //     legendRangeSevere.select("line.hr-line-right")
    //                   .attr("x1", Low_Normal_High_VeryHigh_SevereGroupWidthHalf + StringWidth + SpaceWidth)
    //                   .attr("x2", Low_Normal_High_VeryHigh_Severe)
    //     legendRangeSevere.select("line.vt-line-right")
    //                   .attr("x1", Low_Normal_High_VeryHigh_Severe)
    //                   .attr("x2", Low_Normal_High_VeryHigh_Severe)
        
          
    //   });
    // },
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
          .style("font-size", "13px")
          .text(Math.floor(val) + "㎍/㎥");

      d3.select("#airpolLegend .legendDot text.lower")
          .attr("x", -7)
          .attr("y", this.legendBarHeight - 23)
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
      
      this.axios
          .get("/districts", {params: {searchQuery: this.searchQuery}})
          .then(res => {
            if(res.data.result.length == 0) return this.$toasted.info("결과가 없습니다. 다시 검색해주세요.")
            this.searchList =  res.data.result;
            console.log("this.searchList : ", this.searchList)
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
              // this.naverMap.updateBy({x: center.x-0.05, y: center.y},this.beforeZoom);
              // console.log("feature.bounds : ", feature.bounds)
              this.naverMap.fitBounds(feature.bounds)
              
              this.selectedDistricts = [];

              // this.naverMap.panTo(center);
              
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
              });

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
      this.toggleSearch = false;
      this.zoomChanged = false; // zoom_changed 이벤트 영향 안받게
      this.searchList = []; // 리스트 초기화
      this.isLoading=true;
      this.sideMenu = true;
      this.viewDetail = false;
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
      this.targetLocation = null;
      this.sideMenu = false;
      this.viewDetail = false;
      this.selectedDistricts = [];

      if(this.beforeClickedFeature) {
        this.naverMap.data.overrideStyle(this.beforeClickedFeature, {
          strokeColor: '#555',
          strokeWeight: 2
        });
      }
      if(this.goTo) {
        // 검색 후 취소버튼 클릭시 한 지역 포커싱 취소
        this.goTo = false;
        this.searchQuery = null;
        if(this.beforeZoom < 5) this.initSdMapDrawing();
        else if(this.beforeZoom == 5) this.initSggZoom5MapDrawing();
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
            point.x -= 0.93;
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
            point.x -= 0.2;
            point.y += 0.4;
            break;
          case "경상남도":
            point.x -= 0.5;
            point.y -= 0.15;
            break;
          case "대구광역시":
            point.y += 0.3;
            break;
          case "울산광역시":
            point.x += 0.15;
            point.y += 0.25;
            break;
          case "부산광역시":
            point.x -= 0.25;
            point.y -= 0.15;
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
          case "제주특별자치도":
            point.x += 0.1;
            point.y += 0.35;
            break;
        }
        return point;
      } else {
        let point = feature.bounds.getCenter();
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
      return new Promise((resolve, reject) => {
        
        const position = this.setMarkerPoint(feature);

        if(!feature.mapMarker) feature.mapMarker = new naver.maps.Marker({})
        const viewIcon = this.beforeZoom > 5 ? '' : '<img class="view" src="https://png.icons8.com/material-outlined/80/000000/search.png">'
        if(!this.whoStandard) {
          feature.mapMarker.setOptions({
            position,
            map: this.naverMap,
            icon: {
              content: 
                `<div class='mapMarker' id='sgg-${feature.property_sigungu_cd}'>` +
                  "<div class='mapMarkerlabelWrapper text-center'>" +
                    "<p class='label top-label sd_nm'>" + (feature.property_SIDO_NM ? this.$options.filters.district_nm_filter(feature.property_SIDO_NM) : feature.property_sigungu_nm) + "</p>" +
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
                  "<div class='mapMarkerWrapperOver' style='background-color: initial;margin: auto;position: absolute;top: 25px;'>" + 
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
        resolve(feature.property_sigungu_cd)
      });
    },
  }
}
</script>
