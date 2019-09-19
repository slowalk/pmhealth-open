// <template lang="pug">    
//   div.map
//     nav.navbar.navbar-expand-lg.bg-white.mapNav
//       b-container(fluid)
//         b-nav-form
//           b-navbar-brand.logo-text(href="/map" style="padding: 3px;") 미세먼지 대기건강지수
//           b-navbar-nav
//             //- 검색창
//             .input-group
//               input.form-control.searchBox.main-border-color(style='padding: 0.26rem;padding-left: 0.6rem;' type="text" class="form-control" placeholder="궁금한 지역을 검색하세요" v-model="searchQuery" @keyup.enter.prevent="searchLocation()" @keyup.esc="searchList=null")
//               //- img.seachCancelBtn(src="https://img.icons8.com/ios/50/000000/cancel.png" v-bind:class="{hide: searchQuery == null}" @click="searchQuery = null; searchList=null;")
//               .input-group-append(style="display: inline-block;")
//                 button.btn.btn-secondary.main-bg-color.searchBtn(type="submit" @click.prevent="searchLocation()"  @blur="searchList=null")
//                   i.fa.fa-search
//             .searchList(v-if='searchList')
//               a.searchList-item.searchList-item-action(href="#" @click.prevent="goToLocation(sl.SGG_CD)" v-for='sl in searchList') 
//                 font-awesome-icon.mr-2(icon="search" color="gray")
//                 | {{sl.SD_NM}} {{sl.SGG_NM == sl.SD_NM ? "" : sl.SGG_NM}}
//         .page-wrappers
//           //- ul.navbar-nav
//           img.menu(style="width: 30px; height: 30px;" src="https://img.icons8.com/material-rounded/48/000000/menu.png" @click="menuToggle = !menuToggle")

//     .menuBgWrapper(v-bind:class="{hide : !menuToggle}" @click="menuToggle = false")
//     .menuDiv(v-bind:class="{slideLeft: !menuToggle}")
//       .toggle-wrapper
//         img(src="https://img.icons8.com/ios/50/000000/delete-sign.png" @click="menuToggle = !menuToggle")
//       router-link(to="/info/service") 미세먼지 건강지도 안내
//       router-link(to="/info/detail") 미세먼지와 건강
//       router-link(to="/info/madein") 미세먼지 사업단 소개
//       router-link(to="/info/refer") 관련페이지
//       router-link(to="/info/data") 데이터정보
//       router-link(to="/map") 지도정보

//     .loading-parent
//       loading(:active.sync="isLoading" 
//               :can-cancel="false"
//               :is-full-page="true")
//     .main-modal
//       b-modal(ref="myModalRef" size="lg" centered @hidden="initSdMap()" :hide-footer="true")
//         template(slot="modal-header")
//           .d-block.main-modal-header
//             font-awesome-icon.cancelBtn(icon="times" color="silver" @click="hideModal()")
//         .content
//           b-row
//             b-col
//               p.subtitle.pb-0.pt-0 미세먼지 지도정보
//               h3.mb-5
//                 | 내가 사는 곳의 
//                 br
//                 | 미세먼지 위험도를 확인하세요
//           b-row
//             b-col(cols="12" md="8")
//               p.mb-3
//                 | 지난 4월 6일 서울 잠실에서 열릴 예정이었던 프로야구 경기가 취소됐습니다. 이날 저녁 미세먼지(PM10)가 200㎍/㎥, 초미세먼지(PM2.5)는 40㎍/㎥ 이상 치솟았기 때문이죠. 미세먼지 때문에 프로야구 경기가 취소된 건 처음이었습니다.
//               p 미세먼지 수치에 대한 관심이 높아지면서 다양한 앱이 인기를 얻고 있다. 하지만 저마다 기준이 달라 ‘더 헷갈린다’는 사람도 많다.
//             b-col(cols="12" md="4")
//               p.linkTo.mb-0 바로가기
//               .linkWrapper
//                 .item
//                   router-link(to="/info/service") 미세먼지 건강지도 안내 >
//                 .item
//                   router-link(to="/info/detail") 미세먼지와 건강 >
//                 .item
//                   router-link(to="/info/madein") 미세먼지 사업단 소개 >
//                 .item
//                   router-link(to="/info/refer") 관련페이지 > 
//                 .item
//                   router-link(to="/info/data") 데이터 정보 >
//         //- template(slot="modal-footer")
//           //- b-btn(size="sm" class="float-right" @click="hideModal()") 닫기
    
      
//     .leftLegend.dp-none-mobile(v-bind:class="{slideLeft: sideMenu}")
//       img(src="https://img.icons8.com/material-sharp/48/c02b1f/error.png")
//       span.title 상대위험도&nbsp;
//       span.sign (%)

//     // 정보창 - 모바일 뷰
//     .infoBgWrapper(v-bind:class="{hide : targetLocation == null}" @click="targetLocation = null")
//     #airpolLegendWrapper(v-if="isMobile()")
//       .titleWrapper
//         p.mb-0 
//           b 미세먼지 농도
//         p.mb-0
//           span (단위 : ㎍/㎥)
//       svg#airpolLegend
//     .bottomInfo.dp-none-nomobile(v-bind:class="{hide : targetLocation == null}" v-if="targetLocation != null")
//       .box
//         p.key.mb-1
//           b 초과사망자
//         p.value 
//           | {{Math.floor(targetLocation.PM2_5)}}
//           | {{'PM2_5' | unitText}}
//       .box
//         p.key.mb-1
//           b 미세먼지
//         p.value {{Math.floor(targetLocation.OverallDeath)}}명
//     // 정보창 - 데스크탑 뷰
//     //- .leftInfo.dp-none-mobile
//     .leftInfo.dp-none-mobile(:class="{slideLeft: !sideMenu}")
//       button.cancelDetail(@click="cancelDetail()" v-if="targetLocation != null") X
//       div(class="list-group-item list-group-item-action flex-column align-items-start")
//         div(v-if="targetLocation")
//           span.sido_label {{targetLocation.SIDO_NM || sggCDtoSdCD}}
//           h3.mt-2(v-if="targetLocation.sigungu_cd") 
//             b {{targetLocation.sigungu_nm}}
//           .dataListWrapper.mt-3
//             .dataList
//               p.mb-0
//                 small 
//                   b 미세먼지 농도
//               p.mb-0
//                 b
//                   | PM
//                   sub.underText 2.5
//                   |  = 
//                   span {{ Math.floor(targetLocation.PM2_5) }}
//                   span {{'PM2_5' | unitText}}
//         .legendWrapper
//           //- div(v-bind:class="{ dpOff : !airPolToggle}")
//           p.mb-0.legendInfo
//             small
//               b (단위 : {{airPolTopic | unitText}})
//           svg#airpolLegend
//       div(class="list-group-item list-group-item-action flex-column align-items-start" v-if="targetLocation")
//         .dataListWrapper
//           .dataList
//             p
//               small
//                 b 미세먼지에 의한
//             h4 
//               b 
//                 | 건강영향도 : 
//                 //- | '초과' 사망자 = 
//                 //- span {{Math.floor(targetLocation.OverallDeath)}} 명
//                 //- span {{targetLocation}}
//                 //- span {{targetLocation.Index_total_PM10 > 10 ? "10+" : Math.ceil(targetLocation.Index_total_PM10)}}
//                 span {{targetLocation.Index_total_PM10 | index_total_PM10_filter}}
//             .overdeathLegendWrapper
//               .stepBoxWrapper
//                 .stepBox
//                   .step-1
//                   .text-center
//                     p.mb-0 1
//                 .stepBox
//                   .step-2
//                   .text-center
//                     p.mb-0 2
//                 .stepBox
//                   .step-3
//                   .text-center
//                     p.mb-0 3
//                 .stepBox
//                   .step-4
//                   .text-center
//                     p.mb-0 4
//                 .stepBox
//                   .step-5
//                   .text-center
//                     p.mb-0 5
//                 .stepBox
//                   .step-6
//                   .text-center
//                     p.mb-0 6
//                 .stepBox
//                   .step-7
//                   .text-center
//                     p.mb-0 7
//                 .stepBox
//                   .step-8
//                   .text-center
//                     p.mb-0 8
//                 .stepBox
//                   .step-9
//                   .text-center
//                     p.mb-0 9
//                 .stepBox
//                   .step-10
//                   .text-center
//                     p.mb-0 10
//                 .stepBox
//                   .step-11
//                   .text-center
//                     p.mb-0 10+
//               .step-explain-wrapper
//                 .low-risk
//                   p.mb-0
//                     | Low Risk
//                     br
//                     | (1~3)
//                 .mod-risk
//                   p.mb-0
//                     | mode Risk
//                     br
//                     | (4~6)
//                 .high-risk
//                   p.mb-0
//                     | High Risk
//                     br
//                     | (7~10)
//                 .very-high-risk
//                   p.mb-0
//                     | Very High Risk
//             .overdeathInfoWrapper
//               //- p.mb-2
//               //-   small
//               //-     | * 
//               //-     span.main-color 초과사망자수
//               //-     | 란?
//               //- img(src="https://img.icons8.com/android/30/1f88ed/sort-down.png" :class="{rotate180: infoBoxToggle}" @click="infoBoxToggle = !infoBoxToggle")
//               //- .infoBox(:class="{hide: infoBoxToggle}")
//               //-   p.mb-0
//               //-     | - Ischemic heart disease : 허열성 심장 질환
//               //-     br
//               //-     | - Chronic obstructive lung disease : 만성 폐쇄성 폐질환
//               //-     br
//               //-     | - Lung cancer : 폐암
//               //-     br
//               //-     | - Stroke : 뇌졸중
//               .relativeRisk
//                 //- .leftBox
//                   img(src="https://img.icons8.com/material-sharp/48/c02b1f/error.png")
//                   p.title
//                     b 상대위험도
//                   br
//                   p.tex-center.percentage 
//                     b {{(targetLocation.OverallDeathBeta).toFixed(3)}}
//                 .rightBox
//                   b-form-checkbox-group(v-model='whoStandard' @change="whoStandardChange")
//                     b-form-checkbox(value='true') WHO 기준으로 보기
//                   //- b-form-checkbox-group(v-model='jejuStandard' @change="jejuStandardChange")
//                     b-form-checkbox(value='true') 제주도 기준으로 보기
//                 //- div
//                   .box
//                     p.key.mb-0 남자
//                     br
//                     p.value {{(targetLocation.MaleOverallDeath).toFixed(0)}}명
//                   .box
//                     p.key.mb-0 여자
//                     br
//                     p.value {{targetLocation.FemaleOverallDeath.toFixed(0)}}명
//                 //- div
//                   .box
//                     p.key.mb-0 심뇌혈관
//                     br  
//                     p.value {{targetLocation.CerebralBloodVesselOverallDeath}}명
//                   .box
//                     p.key.mb-0 호흡기
//                     br
//                     p.value {{targetLocation.CerebralBreathOverallDeath}}명
//       //- div(class="list-group-item list-group-item-action flex-column align-items-start" v-if="targetLocation")
//         .dataListWrapper
//           .dataList
//             .locationInfo
//               h4.title 대상지 정보
//               div
//                 .box
//                   p.key
//                     small 총인구
//                   p.value 123123명
//                 .box
//                   p.key 
//                     small 예상 사망자
//                   p.value 1234명
    
    
//     div.dp-none-mobile(class="mapTooltip" ref="mapTooltip")
//     div(id="targetMap" class="map")
    
//     //- button.toolBtn.border-round(ref="resetBtn" href="#" @click.prevent="setToInitMap()" ) 
//       img(src="https://png.icons8.com/android/40/000000/expand.png")
//     //- button.toolBtn.border-round(ref="resetBtn" href="#" @click.prevent="setToInitMap()" ) 
//     //-   img(src="https://img.icons8.com/ios/30/000000/sorting-options-filled.png")
      
//     button.toolBtn.dp-none-mobile.border-round(ref="userLocationBtn" href="#" @click.prevent="setToUserLocation()" ) 
//       img(src="https://img.icons8.com/ios-glyphs/30/000000/center-direction.png")


//     //- //- 줌 컨트롤러
//     //- #zoomControl(ref="zoomControl")

//     //- 스위치 
//     #valueToggleBtn(ref="valueToggleBtn")
//       button.toolBtn.border-round( href="#" @click.prevent="toggleFilter()" ) 
//         img(src="https://img.icons8.com/ios/30/000000/sorting-options-filled.png")
//       .switchWrapper.mt-2(v-if="!isMobile()" v-bind:class="{hide: !filterBtn}")
//         .list.pt-1
//           span.text-center
//             b 미세먼지 농도
//           .labelWrapper.text-center
//             label.onoffbtn(v-bind:class="{active: airPolToggle}")
//               input(type="checkbox" v-bind:class="{active: airPolToggle}" checked @click="toggleFilterSwitch('airpol')")
            
//         .list.pt-1
//           span.text-center
//             b 초과사망자수
//           .labelWrapper.text-center
//             label.onoffbtn(v-bind:class="{active: addrToggle}")
//               input(type="checkbox" v-bind:class="{active: addrToggle}" checked  @click="toggleFilterSwitch('addr')")
//     // 모바일 토글버튼
//     .infoBgWrapper(v-bind:class="{hide : !filterBtn}" @click="filterBtn = false")
//     .mobileSwitchWrapper(v-if="isMobile()" v-bind:class="{hide: !filterBtn}")
//       .list.pt-1
//         span.text-center
//           b 미세먼지 농도
//         .labelWrapper.text-center
//           label.onoffbtn(v-bind:class="{active: airPolToggle}")
//             input(type="checkbox" v-bind:class="{active: airPolToggle}" checked @click="toggleFilterSwitch('airpol')")
          
//       .list.pt-1
//         span.text-center
//           b 초과사망자수
//         .labelWrapper.text-center
//           label.onoffbtn(v-bind:class="{active: addrToggle}")
//             input(type="checkbox" v-bind:class="{active: addrToggle}" checked  @click="toggleFilterSwitch('addr')")


//     //- .dp-none-mobile(ref="monthPickerControl")
//     //-   button.toolBtn(@click.prevent="monthPickerBtn = !monthPickerBtn") 
//     //-     //- span.date {{ selected.year != '월 평균' ? selected.year + '년 ' + selected.month + '월' : selected.month + selected.year}}
//     //-     span.date {{ selected.month }}월
//     //-     img(src="https://img.icons8.com/material/30/000000/sort-down--v1.png" v-bind:class="{rotation: monthPickerBtn}")
//     //-   .monthPickerWrapper(v-bind:class="{hide: !monthPickerBtn}")
//     //-     //- .select
//     //-       //- img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" @click="changeDateFilter('year', -1)")
//     //-       span {{selected.year != '월 평균' ? selected.year + '년' : selected.year}}
//     //-       //- img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" @click="changeDateFilter('year', 1)")
//     //-     .select
//     //-       img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" @click="changeDateFilter('month', -1)")
//     //-       span {{selected.month}}월
//     //-       img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" @click="changeDateFilter('month', 1)")
//     .dp-none-mobile(ref="monthPickerControl")  
//       button.toolBtn
//         .select
//           img.left(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png" @click="changeDateFilter('month', -1)")
//           span &nbsp;{{selected.month}}월&nbsp;
//           img.right(src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png" @click="changeDateFilter('month', 1)")
  
// </template>

// <style lang="scss" scoped> // scoped로 다른 영역 css 접근 차단 - 원래대로 보려면 scoped 제거.
//   /* IE9, IE10 */
//   @media screen and (min-width:0\0) {
//     .navbar-brand.logo-text {
//       margin-top: -1px !important;
//     }
//     .navbar .menu {
//       margin-top: -1px !important;
//     }
//     .navbar-nav .input-group {
//       display:inline-block;
//       .searchBox {
//         min-width: 220px !important;
//         padding: 0.3rem !important;
//       }
//     }
//     .main-modal .modal-body {
//       min-height: 450px;
//     }
//     .page-wrappers {
//       position: absolute;
//       display: inline-block;
//       right: 0px;
//       top: 0px; 
//       margin: 8px 10px;
//     }
//   }
//   @media screen and (min-width: 600px) {
//     .dp-none-nomobile {
//       display: none;
//     }
//     .input-group.searchBox {
//       min-width: 220px !important;
//     }
//     .navbar .input-group {
//       width: 330px !important; 
//     }
//   }
//   @media screen and (max-width: 600px) {
//     .searchBtn {
//       height: 100%;
//     }
//     .page-wrappers {
//       position: absolute;
//       display: inline-block;
//       right: 0px;
//       top: 0px; 
//       margin: 8px 10px;
//     }
//     #airpolLegendWrapper {
//       position:absolute;
//       padding: 5px 10px;
//       width: 205px;
//       top: 55px;
//       right: 10px;
//       z-index: 100;
//       font-size: 14px;
//       background-color:white;
//       .titleWrapper{
//         margin-left: 5px;
//         p {
//           display: inline-block;
//           width: 50%;
//           &:last-child {
//             text-align: right;
//             padding-right: 5px;
//           }
//         }
//       }
//       #airpolLegend {
//         width: 100%;
//         height: 45px;
//       }
//     }
//     .toolBtn {
//       .date {
//         margin-left: 5px;
//         margin-right: 10px;
//       }
//       font-weight: 700;
//       &.border-round {
//         border-radius: 50%;
//       }
//       padding: 8px;
//       cursor: pointer;
//       background: white;
//       font-size: 13px;
//       border: 1px solid black;
//       margin: 15px 10px !important;
//       img{
//         height: 25px !important;
//         width: 25px !important;
//         // width: 18px;
//         vertical-align: top;
//       }
//     }
//     .mobileSwitchWrapper {
//       width: 100% !important;
//       bottom: 0px;
//       font-size: 14px;
//       position: absolute;
//       background-color: white;
//       left: 0px;
//       padding: 10px 0px;
//       z-index: 110;
//       p {
//         display: inline-block;
//         vertical-align: top; 
//         width: 50%
//       }
//       .list {
//         display: inline-block;
//         width: 49.9%;
//         text-align: center;
//         padding: 7px 15px;
//         font-size: 18px;
//         span {
//           vertical-align: sub;
//         }
//       }
//       .labelWrapper{
//         float: right;
//         margin-top: 5px;
//         .onoffbtn{
//           // margin-top: 5px;
//           width: 40px;
//           height: 25px;
//           border-radius:15px;
//           // background: #bbbbbb none repeat scroll 0 0;
//           background: white none repeat scroll 0 0;
//           border: 1px solid rgb(192,43,31);
//           display:block;
//           position:relative;
//           margin-bottom: 0px;
//           cursor: pointer;
//           &.active {
//             border:1px solid rgb(66, 177, 59);
//             -moz-transition: all 0.3s ease-in 0s;
//             -webkit-transition: all 0.3s ease-in 0s;
//             -o-transition: all 0.3s ease-in 0s;
//             transition: all 0.3s ease-in 0s;
//           }

//         }
//         .onoffbtn:after{
//           position:absolute;
//           height: 21px;
//           width: 16px;
//           display:block;
//           border-radius:50%;
//           background:rgb(192,43,31);
//           top:1px;
//           left:1px;
//           content:'';
//           -webkit-transition: all 200ms ease-in-out;
//           -moz-transition: all 200ms ease-in-out;
//           -o-transition: all 200ms ease-in-out;
//           transition: all 200ms ease-in-out;
//           text-align:center;
//           line-height:29px;
//           color:#fff;
//           font-size:12px;
//         }
//         .onoffbtn.active:after{
//           left:100%;
//           margin-left:-17px;
//           background-color: rgb(66, 177, 59);
//           // content:'on';
//           input {
//             border: 1px solid rgb(66, 177, 59);
//           }
//         }
//         .onoffbtn input[type="checkbox"]{
//           opacity:0;
//           cursor: pointer;
//         }

//         .onoffswitch-inner:after {
//           content: "";
//           padding-right: 10px;
//           // background-color: #bbbbbb;
//           color: #999999;
//           text-align: right;
//           border-radius: 0 19px 19px 0;
//         }

//         .onoffswitch-switch {
//           width: 19px;
//           margin: 0px;
//           background: #FFFFFF;
//           border: 1px solid #999999;
//           border-radius: 19px;
//           position: absolute;
//           top: 0;
//           bottom: 0;
//           right: 20px;
//           -moz-transition: all 0.3s ease-in 0s;
//           -webkit-transition: all 0.3s ease-in 0s;
//           -o-transition: all 0.3s ease-in 0s;
//           transition: all 0.3s ease-in 0s;
//           background-image: -moz-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//           background-image: -webkit-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//           background-image: -o-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//           background-image: linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//           box-shadow: 0 1px 1px white inset;
//         }

//         .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
//           margin-left: 0;
//         }

//         .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
//           right: 0px;
//         }
//       }
//     }
//     .infoBgWrapper { 
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       top: 0px;
//       background-color: rgba(70,70,70,0.8);
//       z-index: 105;
//     }
//     .bottomInfo {
//       padding:15px;
//       position: absolute;
//       bottom: 0px;
//       left: 0px;
//       width: 100%;
//       z-index: 110;
//       background: white;
//       .box {
//         display: inline-block;
//         width: 50%;
//         font-weight:700;
//         .key {
//           font-size: 20px;
//         }
//         .value {
//           font-size: 30px;
//         }
//       }
//     }
//     .searchList {
//       top: 45px !important;
//       right: 0px;
//       width: 100% !important;
      
//     }
//     .navbar {
//       padding: 8px 10px !important;
//       .logo-text {
//         display: none; 
//       }
//       .form-inline {
//         display: inline-block;
//         width: 250px;
//         margin-top: 0px;
//         input {
//           height: 30px;
//         }
//         button {
//           padding: 0px 5px;
//         }
//       }
//       .page-wrapper { 
//         float: right;
//         img {
//           height: 20px;
//           margin-top: 5px;
//         }
//       }
//     }
//   }
//   .step-1 {
//     border: 3px solid rgb(0,198,255)
//   }
//   .step-2 {
//     border: 3px solid rgb(0,143,195)
//   }
//   .step-3 {
//     border: 3px solid rgb(0,90,142)
//   }
//   .step-4 {
//     border: 3px solid rgb(252,255,8)
//   }
//   .step-5 {
//     border: 3px solid rgb(255,197,6)
//   }
//   .step-6 {
//     border: 3px solid rgb(255,144,47)
//   }
//   .step-7 {
//     border: 3px solid rgb(255,91,93)
//   }
//   .step-8 {
//     border: 3px solid rgb(253,0,7)
//   }
//   .step-9 {
//     border: 3px solid rgb(197,0,8)
//   }
//   .step-10 {
//     border: 3px solid rgb(143,0,2)
//   }
//   .step-11 {
//     border: 3px solid rgb(92,3,1)
//   }

//   .overdeathLegendWrapper {
//     .stepBoxWrapper {
//       .stepBox {
//         width: 9%;
//         font-size: 13px;
//         display: inline-block;
//       }
//       .step-1 {
//         height: 12px;
//         background-color: rgb(0,198,255)
//       }
//       .step-2 {
//         height: 12px;
//         background-color: rgb(0,143,195)
//       }
//       .step-3 {
//         height: 12px;
//         background-color: rgb(0,90,142)
//       }
//       .step-4 {
//         height: 12px;
//         background-color: rgb(252,255,8)
//       }
//       .step-5 {
//         height: 12px;
//         background-color: rgb(255,197,6)
//       }
//       .step-6 {
//         height: 12px;
//         background-color: rgb(255,144,47)
//       }
//       .step-7 {
//         height: 12px;
//         background-color: rgb(255,91,93)
//       }
//       .step-8 {
//         height: 12px;
//         background-color: rgb(253,0,7)
//       }
//       .step-9 {
//         height: 12px;
//         background-color: rgb(197,0,8)
//       }
//       .step-10 {
//         height: 12px;
//         background-color: rgb(143,0,2)
//       }
//       .step-11 {
//         height: 12px;
//         background-color: rgb(92,3,1)
//       }
//     }
//     .step-explain-wrapper {
//       font-size:12px;
//       margin-top: 5px;
//       text-align: center;
//       .low-risk {
//         display:inline-block;
//         width: 27%;
//         vertical-align: super;
//       }
//       .mod-risk {
//         display:inline-block;
//         width: 27%;
//         vertical-align: super;
//       }
//       .high-risk {
//         display:inline-block;
//         width: 36%;
//         vertical-align: super;
//       }
//       .very-high-risk {
//         display:inline-block;
//         width: 9%;
//         vertical-align: sub;
//       }
//     }
//   }

//   .seachCancelBtn {
//     width: 20px;
//     position: absolute;
//     right: 50px;
//     top: 8px;
//     cursor:pointer;
//     z-index: 100;
//   }

//   .switchWrapper {
//     width: 195px;
//     margin: 0px 5px;
//     font-size: 14px;
//     position: absolute;
//     background-color: white;
//     left: 0px;
//     &:after {
//       top: -5px;
//       content: '';
//       position: absolute;
//       border-bottom: 7px solid white;
//       border-right: 8px solid transparent;
//       border-left: 8px solid transparent;
//       right: 4px;
//     }
//     p {
//       display: inline-block;
//       vertical-align: top; 
//       width: 50%
//     }
//     .list {
//       padding: 7px 15px;
//       border-bottom: 1px solid silver;
//       span {
//         vertical-align: middle;
//       }
//     }
//     .labelWrapper{
//       float: right;
//       margin-top: 5px;
//       .onoffbtn{
//         // margin-top: 5px;
//         width: 30px;
//         height: 17px;
//         border-radius:15px;
//         // background: #bbbbbb none repeat scroll 0 0;
//         background: white none repeat scroll 0 0;
//         border: 1px solid rgb(192,43,31);
//         display:block;
//         position:relative;
//         margin-bottom: 0px;
//         cursor: pointer;
//         &.active {
//           border:1px solid rgb(66, 177, 59);
//           -moz-transition: all 0.3s ease-in 0s;
//           -webkit-transition: all 0.3s ease-in 0s;
//           -o-transition: all 0.3s ease-in 0s;
//           transition: all 0.3s ease-in 0s;
//         }
//       }
//       .onoffbtn:after{
//         position:absolute;
//         height: 13px;
//         width: 13px;
//         display:block;
//         border-radius:50%;
//         background:rgb(192,43,31);
//         top:1px;
//         left:1px;
//         content:'';
//         -webkit-transition: all 200ms ease-in-out;
//         -moz-transition: all 200ms ease-in-out;
//         -o-transition: all 200ms ease-in-out;
//         transition: all 200ms ease-in-out;
//         text-align:center;
//         line-height:29px;
//         color:#fff;
//         font-size:12px;
//       }
//       .onoffbtn.active:after{
//         left:100%;
//         margin-left:-14px;
//         background-color: rgb(66, 177, 59);
//         // content:'on';
//         input {
//           border: 1px solid rgb(66, 177, 59);
//         }
//       }
//       .onoffbtn input[type="checkbox"]{
//         opacity:0;
//         cursor: pointer;
//       }

//       .onoffswitch-inner:after {
//         content: "";
//         padding-right: 10px;
//         // background-color: #bbbbbb;
//         color: #999999;
//         text-align: right;
//         border-radius: 0 19px 19px 0;
//       }

//       .onoffswitch-switch {
//         width: 19px;
//         margin: 0px;
//         background: #FFFFFF;
//         border: 1px solid #999999;
//         border-radius: 19px;
//         position: absolute;
//         top: 0;
//         bottom: 0;
//         right: 20px;
//         -moz-transition: all 0.3s ease-in 0s;
//         -webkit-transition: all 0.3s ease-in 0s;
//         -o-transition: all 0.3s ease-in 0s;
//         transition: all 0.3s ease-in 0s;
//         background-image: -moz-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//         background-image: -webkit-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//         background-image: -o-linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//         background-image: linear-gradient(center top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 80%);
//         box-shadow: 0 1px 1px white inset;
//       }

//       .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
//         margin-left: 0;
//       }

//       .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
//         right: 0px;
//       }
//     }
//   }
//   .dpOff {
//     display:none;
//   }
//   .notSelected {
//     font-size: 15px;
//     padding: 5px 10px;
//     font-weight: 600;
//   }
//   .modal-backdrop.show {
//     opacity: 0.15 !important;
//   }
//   .main-modal {
//     .modal-content {
//       background-color: rgba(30,30,30,0.9) !important;
//       color:white;
//     }
//     .modal-header {
//       padding: 0px !important;
//       border-bottom: none !important;
//       .main-modal-header {
//         padding:20px 30px;
//         width: 100%;
//         text-align: right;
//         .cancelBtn {
//           font-size: 25px;
//         }
//         // background-color: #1c54ae;
        
//       } 
//     }   
//     .content {
//       padding:1rem;
//       .subtitle {
//         color: #1f88ed;
//       }
//       p  {
//         font-size: 14px;
//         margin-bottom: 5px;
//       }
//       .linkTo {
//         font-size: 17px;
//         padding: 15px 10px;
//       }
//       .linkWrapper  {
//         border-top:1px solid silver;
//         padding: 15px 10px;
//         font-size: 15px;
//         .item {
//           margin-bottom: 15px;
//           a {
//             text-decoration: none;
//             color: silver;
//             &:hover {
//               color: #1f88ed;
//             }
//           }
//         }
//       }
//     }
//   }
//   .monthPickerWrapper {
//     margin: 0px 5px;
//     background-color: white;
//     .select {
//       display: block;
//       text-align: center;
//       margin: auto;
//       font-weight: 700;
//       font-size: 14px;
//       height: inherit !important;
//       padding: 5px;
//       border: 1px solid;
//       border-top: 0px;
//       .left {
//         float:left;
//         cursor: pointer;
//       }
//       .right {
//         cursor: pointer;
//         float:right;
//       }
//       img {
//         margin-top: 5px;
//         height: 12px;
//       }
//     }
//     select {
//       display: block;
//       margin: auto;
//       font-weight: 700;
//       font-size: 14px;
//       height: inherit !important;
//       padding: 5px;
//     }
//   }
//   .toolBtn {
//     .date {
//       margin-left: 5px;
//       margin-right: 10px;
//     }
//     font-weight: 700;
//     &.border-round {
//       border-radius: 50%;
//     }
//     padding: 5px;
//     cursor: pointer;
//     background: white;
//     font-size: 13px;
//     border: 1px solid black;
//     margin: 5px;
//     margin-bottom: 0px;
//     margin-top: 10px;
//     img{
//       height: 18px;
//       width: 18px;
//       vertical-align: top;
//     }
//   }
//   .searchList {
//     position: absolute;
//     top: 50px;
//     background-color: white;
//     z-index: 120;
//     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//     width: 330px;
//     max-height: 300px;
//     overflow-y: scroll;
//     .searchList-item {
//       display: block;
//       color: black;
//       padding: 10px 15px;
//       border-bottom: solid 1px silver;
//       &:hover {
//         text-decoration: none;
//         background-color: rgba(230,230,230,0.8)
//       }
//     }
//   }
//   #targetMap {
//     // display: inline-block;
//     width: 100%;
//     height: calc(100vh - 53px);
//     svg { 
//       background-color: none !important;
//     }
//   }
//   .leftLegend {
//     position: absolute;
//     // display: inline-block;
//     background-color: rgba(255,255,255,0.9);
//     z-index: 100;
//     margin: 10px;
//     padding: 3px 10px 5px 10px;
//     img {
//       width: 21px;
//       vertical-align: middle;
//       margin-right: 3px;
//     }
//     .title {
//       font-size: 13px;
//       font-weight: 700;
//       vertical-align: middle;
//     }
//     .sign {
//       font-size: 13px;
//       font-weight: 700;
//     }
//     &.slideLeft {
//       transform: translate(-310px ,0);
//       display:none;
//     }
//   }
//   .leftInfo {
//     // transition: 0.1s;
//     position: absolute;
//     // display: inline-block;
//     background-color: rgba(255,255,255,0.9);
//     z-index: 100;
//     height: calc(100vh - 53px);
//     width: 310px;
//     overflow-y: scroll;
//     .list-group-item {
//       padding: 1.7rem 1.25rem !important;
//       background-color: transparent !important;
//       p:hover{
//         background-color: transparent !important;
//       }
//     }
//     .cancelDetail {
//       background: none;
//       position: absolute;
//       border: 1px solid silver;
//       right: 0;
//       margin: 25px;
//       cursor: pointer;
//       z-index: 9999;
//     }
//     &.slideLeft {
//       transform: translate(-310px ,0);
//       display:none;
//     }
//     .slider {
//       position: absolute;
//       cursor: pointer;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background-color: #ccc;
//       -webkit-transition: 0.4s;
//       transition: 0.4s;
//       &:before {
//         position: absolute;
//         content: "";
//         height: 20px;
//         width: 20px;
//         left: 2px;
//         bottom: 4px;
//         background-color: white;
//         -webkit-transition: 0.4s;
//         transition: 0.4s;
//       }
//       &.round {
//         border-radius: 34px;
//         &:before {
//           border-radius: 50%;
//         }
//       }
//     }

//     .axis path {
//       stroke: none;
//     }
//     .axis line {
//       stroke: #000;
//     }
//     .dataListWrapper {
//       .dataList{
//           .box {
//             display: inline-block;
//             width: 50%
//           }
//         .small {
//           font-size:13px;
//         }
//         .overdeathInfoWrapper {
//           p {
//             display: inline-block;
//           }
//           img {
//             width: 16px;
//             height: 16px;
//             margin-left:5px;
//             vertical-align: text-bottom;
//           }
//           .infoBox {
//             border-top: 1px solid gray;
//             background-color: rgb(221,222,225);
//             padding: 15px 10px;
//             font-size: 13px;
//           }
//           .relativeRisk {
//             margin-top: 10px;
//             .leftBox {
//               display: inline-block;
//               width:50%;
//               .percentage {
//                 margin-left: 25px;
//                 font-size: 25px; 
//               }
//               .title {
//                 margin-left: 5px;
//                 font-size: 15px;
//               }
//               p {
//                 margin: 0px;
//               }

//             }
//             .rightBox {
//               position: absolute;
//               display: inline-block;
//               // width:50%;
//               margin-top: -4px;
//               label {
//                 padding-top: 3px;
//                 font-size: 13px;
//               }
//             }
//           }
//         }
//         .locationInfo {
//           .box {
//             display: inline-block;
//             width: 50%
//           }
//           p, p small {
//             margin: 0px;
//             font-weight: 700;
//           }
//           h4 {
//             font-weight: 700;
//           }
//         }
//         p {
//           // cursor: pointer;
//           // padding: 5px 10px;
//           &.topicActive {
//             background-color: #2f87ec;
//             color: white;
//           }
//           &:hover {
//             background-color: #999;
//           }
//         }
//         .addrWrapper {
//           font-size: 13px;
//           p {
//             padding-left: 20px;
//           }
//         }
//       }
//     }
//     .legendWrapper {
//       .legendInfo {
//         font-size:12px;
//       }
//       #airpolLegend {
//         height: 45px;
//         width:100%;
//       }
//       #airpolLegend, #addrLegend {
//         // width: 100%;
//       }
//     }
//   }

//   .airPolDataFilter, .addrDataFilter {
//     margin: 10px;
//     button {
//       background-color: white;
//       border: 1px solid silver;
//       &:hover {
//         background-color: #999;
//       }
//       cursor: pointer;
//       &.active {
//         background-color: rgb(47, 135, 236);
//         border: 0px;
//         color: white;
//       }
//     }
//   }
//   .mapMarkerWrapperOver {
//     border-radius: 50%;
//     height: 80px;
//     width: 80px;
//     text-align: center;
//     p.inCurcle {
//       line-height: 14px;
//       margin: 0px;
//       font-size: 11px;
//       padding-top: 16px;
//       // color: rgba(255,255,255,0.8);
//     }
//   }
//   .mapMarkerWrapperOver {
//     background-color: white;
//     text-align: center;
//     .title {
//       color: gray;
//       font-size: 11px;
//     }
//     .overdeath_value {
//       font-size: 13px;
//       font-weight: 700;
//       line-height: 18px;
//     }
//     // .labelWrapper { 
//     //   .label {
//     //     background-color: #3a3b42;
//     //     font-size: 13px;
//     //     color: white;
//     //     border-radius: 12px;
//     //     width: fit-content;
//     //     padding: 0px 6px;
//     //     margin: 3px auto;
//     //   }
//     // }
//     img.warning {
//       width: 16px;
//     }
//     img.view {
//       width: 20px;
//       background-color: white;
//       border-radius: 50%;
//       border: solid 1px gray;
//       padding: 2px;
//       position: absolute;
//       top: 0px;
//       right: 0px;
//       pointer-events: fill;
//       &:hover {
//         background-color: #ddd;
//       }
//     }
//   }
//   .mapMarkerlabelWrapper { 
//     .label {
//       background-color: #3a3b42;
//       font-size: 13px;
//       color: white;
//       border-radius: 12px;
//       // width: fit-content;
//       display: table;
//       padding: 0px 6px;
//       margin: 3px auto;
//     }
//   }
//   .mapMarkerWrapper {
//     box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 1px;
//     border-radius: 50%;
//     height: 45px;
//     width: 45px;
//     text-align: center;
//     p {
//       line-height: 14px; 
//       margin: 0px;
//       font-size: 11px;
//       padding-top: 7px;
//       // color: rgba(255,255,255,0.8);
//     }
//   }
//   .airPolTooltipMarker {
//     padding:5px 10px;
//     background-color:#fff;
//     border:solid 2px #000;
//     font-size:14px;
//     width: 100px;
//     text-align: center;
//     z-index: 9900;
//     pointer-events: none;
//   }

  
// </style>

// <script>
// import Loading from 'vue-loading-overlay';

// const sdVal = require("../models/sdVal")
// const consumer_key = "29b193cec6074f9c8591"
// const consumer_secret = "f7bc7a00687a4eae8378"

// export default {
//   components: {
//       Loading
//   },
//   data() {
//     return {
//       infoBoxToggle: true,
//       menuToggle: false,
//       airPolToggle: true,
//       addrToggle: true,
//       isLoading: false,
//       q: '',
//       isActive: false,
//       majorOptions: [
//         "전체",
//         "문과대학 국어국문학과",
//         "문과대학 사학과",
//       ],
//       menuOn: false,
//       targetLocation: null,
//       searchQuery: null,
//       searchList: [],
//       panToBoundsOptions: { top: 200, right: 0, bottom: 200, left: 500 },
//       firstMapLat: 36.7,
//       firstMapLng: 127,
//       naverMap: null,
//       airPolTopic: "PM2_5",
//       addrTopic: "ad",
//       airPolD3Linear: null,
//       sdAirPolD3Linear: null,
//       addrD3Quantize: null,
//       sdAddrD3Quantize: null,
//       beforeZoom: null,
//       zoom: 3,
//       d3Legend: null,
//       legendBarHeight: 20,
//       legendRectBoundsWidth: 0,
//       mapOptions: null,
//       clickedBeforePath: false,
//       getUserLocation: null,
//       userLocation: null,
//       userLocationMarker: null,
//       sggMapData: null,
//       groupMapData: null, // 그룹으로 묶인 시군구 - 경기남부/북부, 강남/강북
//       sggsWithoutGroupMapData: null, // 그룹으로묶인 시군구 외의 시군구
//       sdMapData: null,
//       // date: "2015_12",
//       Pm2_5Sd: null,
//       Pm2_5Sgg: null,
//       OverallDeathSd: null,
//       OverallDeathSgg: null,
//       Pm2_5SdStats: null,
//       Pm2_5SggStats: null,
//       OverallDeathSdStats: null,
//       OverallDeathSggStats: null,
//       districtStandard: "sd",
//       selected: {
//         year: "2015",
//         month: "1"
//         // year: "월 평균",
//         // month: "1"
//       },
//       options: {
//         // year: ['2012','2013','2014','2015', '월 평균'],
//         year: ["2015"],
//         month: ['1','2','3','4','5','6','7','8','9','10','11','12'],
//       },
//       monthPickerBtn: false,
//       legendDotMarginLeft: 5,
//       mapDownloadChecker: {
//         sggMap: false,
//         sggZoom5: false,
//       },
//       filterBtn: false,
//       whoStandard: false,
//       jejuStandard: false,
//       sideMenu: false,
//       naverMapProj: null,
//       zoomChanged: true,
//       getTargetLocationData: [
//         "OverallDeath",
//         "OverallDeathBeta",
//         "PM2_5",
//         "SIDO_CD",
//         "SIDO_NM",
//         "sigungu_cd",
//         "sigungu_nm",
//         "FemaleOverallDeath",
//         "MaleOverallDeath",
//         "CerebralBloodVesselOverallDeath",
//         "CerebralBreathOverallDeath",
//         "Index_total_PM10",
//       ]
//     }
//   },
//   computed: {
//     date: function() {
//       if(this.selected.year == '월 평균') return this.selected.month + "mth_avg"
//       else return this.selected.year + '_' + this.selected.month
//     },
//     sggCDtoSdCD: function() {
//       console.log("this.targetLocation : ", this.targetLocation);
//       const cd = this.targetLocation.sigungu_cd.substring(0,2);
//       switch(cd) {
//         case "11" : return "서울특별시"
//         case "21" : return "부산광역시"
//         case "22" : return "대구광역시"
//         case "23" : return "인천광역시"
//         case "24" : return "광주광역시"
//         case "25" : return "대전광역시"
//         case "26" : return "울산광역시"
//         case "29" : return "세종특별자치시"
//         case "31" : return "경기도"
//         case "32" : return "강원도"
//         case "33" : return "충청북도"
//         case "34" : return "충청남도"
//         case "35" : return "전라북도"
//         case "36" : return "전라남도"
//         case "37" : return "경상북도"
//         case "38" : return "경상남도"
//         case "39" : return "제주특별자치도"
//       }
//     }
//   },
//   created() {
//     this.initUserLocationMarker();
//     this.mapOptions = {
//       mapTypeControl: false,
//       mapTypeControlOptions: {
//           style: naver.maps.MapTypeControlStyle.BUTTON,
//           position: naver.maps.Position.TOP_RIGHT
//       },
//       zoomControl: this.isMobile() ? false : true,
//       zoomControlOptions: {
//           style: naver.maps.ZoomControlStyle.SMALL,
//           position: naver.maps.Position.TOP_RIGHT,
//       },
//       scaleControl: false,
//       logoControl: true,
//       logoControlOptions: {
//         position: naver.maps.Position.BOTTOM_LEFT
//       },
//       mapDataControl: false,
//       center: new naver.maps.LatLng(this.firstMapLat, this.firstMapLng),
//       zoom: 3,
//       minZoom: 3
//     };
//   },
//   mounted() {
//     // this.axios.get(
//     //   "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst",
//     //   {
//     //     headers: {
//     //       'Access-Control-Allow-Origin': '*',
//     //     },
//     //     params: {
//     //       itemCode: "PM25",
//     //       dataGubun: "HOUR",
//     //       pageNo: 1,
//     //       numOfRows: 10,
//     //       searchCondition: "WEEK",
//     //       _returnType: "json",
//     //       searchDate: "2019-01-17",
//     //       ServiceKey: "uli5s4YKkNamXssKH%2FD2OiSV4AJrpTxKUybRCPVw8a3a3yxKNo5PZMQVb4HBDqLeaYXLxV1r147EcFhRkPiBLg%3D%3D"
//     //     }
//     //   }
//     // )
//     // .then(res=>{
//     //   console.log("res : ", res)
//     // })

//     // set 유저 현위치정보
//     if(navigator.geolocation){
//       navigator.geolocation.getCurrentPosition(position => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         this.getUserLocation = new naver.maps.LatLng(lat,lng);
//       })
//     }

//     // legend 초기화
//     this.legendRectBoundsWidth  = this.isMobile() ? 165 : 240;

//     this.showModal();

//     this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);
//     this.naverMapProj = this.naverMap.getProjection();

//     // // 줌 컨트롤 버튼 추가
//     // const zoomControl = this.$refs.zoomControl;
//     // this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(zoomControl);

//     // 변수 토글 스위치
//     const valueToggleBtn = this.$refs.valueToggleBtn;
//     if(!this.isMobile()) this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(valueToggleBtn);
//     else this.naverMap.controls[naver.maps.Position.BOTTOM_RIGHT].push(valueToggleBtn);

//     // 유저위치 컨트롤 버튼 추가
//     const userLocationBtn = this.$refs.userLocationBtn;
//     this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(userLocationBtn);
    
//     // month 컨트롤 버튼 추가
//     const monthPickerControl = this.$refs.monthPickerControl;
//     this.naverMap.controls[naver.maps.Position.TOP_RIGHT].push(monthPickerControl);
//   },
//   filters: {
//     topicUpperText: (value) => {
//       if(value == 'PM2_5' || value == 'PM10') return "PM" 
//       else if(value == 'NO2') return "NO"
//     },
//     topicDownText: (value) => {
//       if(value == 'PM2_5') return "2.5" 
//       else if(value == 'PM10') return "10"
//       else if(value == 'NO2') return "2"
//     },
//     unitText: (value) => {
//       if (value == "PM2_5") return "㎍/㎥";
//       else if (value == "PM10") return "㎍/㎥";
//       else if (value == "NO2") return "ppm";
//     },
//     index_total_PM10_filter: (value) => {
//       if(Math.ceil(value) > 10) return "10+"
//       else if(Math.ceil(value) == 0) return "1"
//       else return Math.ceil(value) 
//     },
//     index_total_PM10_for_class_filter: (value) => {
//       if(Math.ceil(value) > 10) return "11"
//       else if(Math.ceil(value) == 0) return "1"
//       else return Math.ceil(value) 
//     }
//   },
//   methods: {
//     isMobile() {
//       if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
//         return true
//       } else {
//         return false
//       }
//     },
//     initSggMap() {
//       this.isLoading=true;
//       Promise.all([this.initSggMapData(), this.initPm2_5Sgg(), this.initOverallDeathSgg()]).then(()=>{
//         this.initSggMapDrawing(); 
//         this.mapDownloadChecker.sggMap = true; 
//         this.isLoading=false;
//       })
//     },
//     initSggZoom5Map() {
//       this.isLoading=true;
//       Promise.all([this.initSggZoom5MapData(), this.initPm2_5Sgg(), this.initOverallDeathSgg()]).then(()=>{
//         this.initSggZoom5MapDrawing();
//         this.mapDownloadChecker.sggZoom5 = true; 
//         this.isLoading=false;
//       })
//     },
//     toggleFilter() {
//       this.filterBtn = !this.filterBtn;
//     },
//     changeDateFilter(key, value) {
//       const optionsKey = this.options[key];
//       const beforeIndex = optionsKey.indexOf(this.selected[key]);
//       const length = optionsKey.length;
//       if(beforeIndex == 0 && value == -1) this.selected[key] = optionsKey[length - 1];
//       else if(beforeIndex == length-1 && value == 1) this.selected[key] = optionsKey[0];
//       else this.selected[key] = optionsKey[beforeIndex + value];
//       this.changeDate()
//     },
//     changeDate() {
//       this.$nextTick(()=> {
//         if(this.beforeZoom < 5) this.initSdMap();
//         else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//         else if(this.beforeZoom > 6) this.initSggMap();
//       })
//     },
//     changePm2_5Sd() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/pm2_5/sd/change", {params: {date: this.date}})
//           .then(res => {
//             this.Pm2_5Sd = res.data.result;
//             this.Pm2_5SdStats = res.data.stats;
//             // let sdAirpolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
//             let sdAirpolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
//             // this.setSdAirPolD3Linear(sdAirpolMin, sdAirpolMax);
//             this.setSdAirPolD3Linear(0, sdAirpolMax);
//             resolve()
//           });
//       });
//     },
//     changeOverallDeathSd() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/overall_death/sd/change", {params: {date: this.date}})
//           .then(res => {
//             this.OverallDeathSd = res.data.result;
//             this.OverallDeathSdStats = res.data.stats;
//             // let sdAddrMin = this.OverallDeathSdStats.min[this.date];
//             let sdAddrMax = this.OverallDeathSdStats.max[this.date];
//             // this.setSdAddrD3Quantize(sdAddrMin, sdAddrMax);
//             this.setSdAddrD3Quantize(0, sdAddrMax);
//             resolve()
//           });
//       });
//     },
//     changePm2_5Sgg() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/pm2_5/sgg/change", {params: {date: this.date}})
//           .then(res => {
//             this.Pm2_5Sgg = res.data.result;
//             this.Pm2_5SggStats = res.data.stats;
//             // let airpolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
//             let airpolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
//             // this.setAirPolD3Linear(airpolMin, airpolMax);
//             this.setAirPolD3Linear(0, airpolMax);
//             resolve()
//           });
//       });
//     },
//     changeOverallDeathSgg() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/overall_death/sgg/change", {params: {date: this.date}})
//           .then(res => {
//             this.OverallDeathSgg = res.data.result;
//             this.OverallDeathSggStats = res.data.stats;
//             // let addrMin = this.OverallDeathSggStats.min[this.date];
//             let addrMax = this.OverallDeathSggStats.max[this.date];
//             // this.setAddrD3Quantize(addrMin, addrMax);
//             this.setAddrD3Quantize(0, addrMax);
//             resolve()
//           });
//       });
//     },
//     changeSdMapDrawing() {
//       // // airpol 범례 추가
//       let airPolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
//       let airPolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
//       this.createAirPolD3Legend(airPolMin, airPolMax);

//       // // 초과사망자수 범례 추가
//       // let addrMin = this.OverallDeathSdStats.min[this.date];
//       // let addrMax = this.OverallDeathSdStats.max[this.date];
//       // this.createAddrD3Legend(this.sdAddrD3Quantize, "ad", addrMin, addrMax)

//       this.naverMap.data.setStyle((feature) => {
//         if(!feature.property_SIDO_CD) return null
//         let targetPm2_5Sd = this.Pm2_5Sd.find(r => {return String(r["SD_CD"]) == feature.property_SIDO_CD });
//         let targetOverallDeathSd = this.OverallDeathSd.find(r => {return String(r["SD_CD"]) == feature.property_SIDO_CD });
        
//         feature.property_PM2_5 = targetPm2_5Sd[this.date];
//         feature.property_OverallDeath = targetOverallDeathSd[this.date];
//         feature.property_SIDO_CD = targetOverallDeathSd.SD_CD;
//         feature.property_SIDO_NM = targetOverallDeathSd.SD_NM;

//         // // 미세먼지 농도 Tooltip용 마커
//         let tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
//         let x = feature.bounds.getCenter().x + 0.2;
//         let y = feature.bounds.getCenter().y + 0.2;

//         feature.airPolTooltipMarker.setOptions({
//           visible: false,
//           position: {x: x, y:y},
//           map: this.naverMap,
//           icon: {
//             content: 
//               "<div class=airPolTooltipMarker style='display: block;'>" + 
//                 "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
//                 "<b>" + tooltipValue + "</b>" + "</p>" +
//               "</div>",
//             size: new naver.maps.Size(22, 35),
//             anchor: new naver.maps.Point(11, 35),
//           }
//         })
        
//         // tooltip용 마커 pointer-events none 설정
//         const aptm = document.querySelectorAll(".airPolTooltipMarker");
//         if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";
      
//         // airPol 색깔 및 css 옵션 설정
//         let qfc = this.sdAirPolD3Linear(feature.property_PM2_5)      
//         feature.sdAirPolMainColor = qfc
        
//         let styleOptions = {
//             fillColor: feature.sdAirPolMainColor,
//         };

//         // 마커 그리기(who 기준 or 건강영향도)
//         this.drawMarker(feature);

//         naver.maps.Event.addListener(feature.mapMarker, 'click', () => {
//           if(feature.property_SIDO_NM == "서울특별시") return this.naverMap.updateBy(feature.bounds.getCenter(),5);
//           else this.naverMap.updateBy(feature.bounds.getCenter(), 7);
//         });

//         naver.maps.Event.addListener(feature.mapMarker, 'mouseover', (e) => {
//           this.naverMap.data.overrideStyle(feature, {
//             strokeWeight: 4
//           });
//           if(this.airPolToggle) {feature.airPolTooltipMarker.setVisible(true)}
//         });

//         naver.maps.Event.addListener(feature.mapMarker, 'mouseout', (e) => { 
//           this.naverMap.data.overrideStyle(feature, {
//             strokeWeight: 2
//           });
//           if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//         });


//         // 초과사망자수 마커 pointer-events none 설정
//         const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
//         if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

//         return styleOptions;
//       });


//       this.naverMap.data.addListener('mouseover', (e) => {
//         let feature = e.feature;
//         if(feature.property_sigungu_cd) return null
//         if(this.airPolToggle) {feature.airPolTooltipMarker.setVisible(true)}
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 4
//         });
//       });

//       this.naverMap.data.addListener('mouseout', (e) => {
//         let feature = e.feature;
        
//         if(feature.property_sigungu_cd) return null
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 2
//         });
//         if(this.airPolToggle && feature.airPolTooltipMarker) {
//           return feature.airPolTooltipMarker.setVisible(false)
//         }
//       });

//       this.naverMap.data.addListener('click', (e) => {
//         if(!this.sideMenu) this.sideMenu = true;
//         let feature = e.feature;
        
//         if(feature.property_sigungu_cd) return null
        
//         // this.targetLocation = {
//         //   OverallDeath: feature.property_OverallDeath,
//         //   OverallDeathBeta: feature.property_OverallDeathBeta,
//         //   PM2_5: feature.property_PM2_5,
//         //   SIDO_CD: feature.property_SIDO_CD,
//         //   SIDO_NM: feature.property_SIDO_NM,
//         //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//         //   MaleOverallDeath: feature.property_MaleOverallDeath,
//         //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//         //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//         //   Index_total_PM10: feature.property_Index_total_PM10
//         // }
//         this.targetLocation = {}
            
//         this.getTargetLocationData.forEach((t)=>{
//           this.targetLocation[t] = feature["property_" + t]
//         })

//         // 클릭시 범례 dot 표시
//         // if(this.airPolToggle) this.setLegendDot(feature.locationData.pm2_5[this.date], this.Pm2_5SdStats.max[this.date])
//         if(this.airPolToggle) this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date])
        
//         // this.pathRevertStyle(feature);
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeColor: '#000',
//           strokeWeight: 4
//         });
//         // this.naverMap.panToBounds(feature.bounds,{}, this.panToBoundsOptions);
//         // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
//       });
//     },
//     initOverallDeathSd() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/overall_death/sd", {params: {date: this.date}})
//           .then(res => {
//             // console.log("initOverallDeathSd res.data : ", res.data)
//             // this.OverallDeathSd = res.data.result;
//             this.OverallDeathSdStats = res.data.stats;
//             // let sdAddrMin = this.OverallDeathSdStats.min[this.date];
//             let sdAddrMax = this.OverallDeathSdStats.max[this.date];
//             // this.setSdAddrD3Quantize(sdAddrMin, sdAddrMax);
//             this.setSdAddrD3Quantize(0, sdAddrMax);
//             // let addrMin = this.OverallDeathSdStats.min[this.date];
//             // let addrMax = this.OverallDeathSdStats.max[this.date];
//             // this.setAddrD3Quantize(addrMin, addrMax);
//             resolve()
//           });
//       });
//     },
//     initOverallDeathSgg() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/overall_death/sgg", {params: {date: this.date}})
//           .then(res => {
//             this.OverallDeathSgg = res.data.result;
//             this.OverallDeathSggStats = res.data.stats;
//             // let addrMin = this.OverallDeathSggStats.min[this.date];
//             let addrMax = this.OverallDeathSggStats.max[this.date];
//             // this.setAddrD3Quantize(addrMin, addrMax);
//             this.setAddrD3Quantize(0, addrMax);
//             resolve()
//           });
//       });
//     },
//     initPm2_5Sd() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/pm2_5/sd", {params: {date: this.date}})
//           .then(res => {
//             // console.log("res.data.result : ", res.data.result)
//             // this.Pm2_5Sd = res.data.result;
//             this.Pm2_5SdStats = res.data.stats;
//             // let sdAirpolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
//             let sdAirpolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
//             // this.setSdAirPolD3Linear(sdAirpolMin, sdAirpolMax);
//             this.setSdAirPolD3Linear(0, sdAirpolMax);
//             resolve()
//           });
//       });
//     },
//     initPm2_5Sgg() {
//       return new Promise((resolve, reject) => {
//         this.axios.get("/pm2_5/sgg", {params: {date: this.date}})
//           .then(res => {
//             // this.Pm2_5Sgg = res.data.result;
//             this.Pm2_5SggStats = res.data.stats;
//             // let airpolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
//             let airpolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
//             // this.setAirPolD3Linear(airpolMin, airpolMax);
//             this.setAirPolD3Linear(0, airpolMax);
//             resolve()
//           });
//       });
//     },
//     initSdMapData() {
//       return new Promise((resolve, reject) => {
//         this.mapOptions.zoom = this.beforeZoom;
//         // 네이버 지도 플랫폼 초기화
//         this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);

//         this.axios.get("/sd_map", {params: {date: this.date}})
//           .then(res => {
//             res.data.result.map(sdData => this.naverMap.data.addGeoJson(sdData));
//             resolve()
//           });
//       });
//     },
//     initSggMapData() {
//       return new Promise((resolve, reject) => {
//         const center = this.naverMap.getCenter();
//         const ne = this.naverMap.getBounds().getNE()
//         const distance = this.naverMapProj.getDistance(center, {x: ne.x, y: center.y})
//         const date = this.date;
//         this.mapOptions.zoom = this.beforeZoom;
//         // 네이버 지도 플랫폼 초기화
//         this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);
        
//         this.axios.get("/sgg_map/allInOne", {params: {center: [center.x, center.y], distance, date}})
//           .then(res => {
//             this.sggMapData = res.data.result;
//             this.sggMapData.map(sggData => this.naverMap.data.addGeoJson(sggData));
//             resolve()
//           });
//       });
//     },
//     initSggZoom5MapData() {
//       return new Promise((resolve, reject) => {
//         const center = this.naverMap.getCenter();
//         const ne = this.naverMap.getBounds().getNE()
//         const distance = this.naverMapProj.getDistance(center, {x: ne.x, y: center.y})
//         const date = this.date;
//         this.mapOptions.zoom = this.beforeZoom;
//         // 네이버 지도 플랫폼 초기화
//         this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);

//         this.axios.get("/sgg_map/group", {params: {center: [center.x, center.y], distance, date}})
//           .then(res => {
//             this.groupMapData = res.data.results;
//             this.groupMapData.map(gmd => {this.naverMap.data.addGeoJson(gmd);})
//             resolve()
//           });
//       });
//     },
//     initSdMap() {
//       this.isLoading = true;
//       Promise.all([this.initSdMapData(), this.initPm2_5Sd(), this.initOverallDeathSd()]).then(()=>{
//         this.initSdMapDrawing(); 
//       }).then(()=> {
//         this.isLoading = false;
//       }).catch(err => {
//         console.log("err : ", err)
//       });
//     },
//     initSdMapDrawing() {
//       return new Promise((resolve, reject) => {
//         // // airpol 범례 추가
//         let airPolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
//         let airPolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
//         this.createAirPolD3Legend(airPolMin, airPolMax);
        

//         // // // 초과사망자수 범례 추가
//         // let addrMin = this.OverallDeathSdStats.min[this.date];
//         // let addrMax = this.OverallDeathSdStats.max[this.date];

//         this.naverMap.data.setStyle((feature) => {
//           let qfc = this.sdAirPolD3Linear(feature.property_PM2_5)
//           feature.airPolMainColor = qfc
//           let styleOptions = {
//               fillColor: feature.airPolMainColor,
//               fillOpacity: 0.8,
//               strokeColor: '#555',
//               strokeWeight: 2,
//               strokeOpacity: 0.4,
//               strokeDasharray: 3
//           };
//           return styleOptions
//         })
//         // 지도 이벤트 설정
//         this.naverMap.data.forEach((feature) => {
//           // 미세먼지 농도 Tooltip용 마커
//           feature.airPolTooltipMarker = new naver.maps.Marker({
//             position: feature.bounds.getCenter(),
//             map: this.naverMap,
//             icon: {
//               content: "<div class='airPolTooltipMarker' style='display: none;'></div>",
//               size: new naver.maps.Size(22, 35),
//               anchor: new naver.maps.Point(11, 35),
//             }
//           });
//           // targetLocation이 이미 있으면 정보만 업데이트
//           if(this.targetLocation && this.targetLocation.SIDO_CD == feature.property_SIDO_CD) {
//             // this.targetLocation = {
//             //   OverallDeath: feature.property_OverallDeath,
//             //   OverallDeathBeta: feature.property_OverallDeathBeta,
//             //   PM2_5: feature.property_PM2_5,
//             //   SIDO_CD: feature.property_SIDO_CD,
//             //   SIDO_NM: feature.property_SIDO_NM,
//             //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//             //   MaleOverallDeath: feature.property_MaleOverallDeath,
//             //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//             //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//             //   Index_total_PM10: feature.property_Index_total_PM10
//             // }
//             this.targetLocation = {}
            
//             this.getTargetLocationData.forEach((t)=>{
//               this.targetLocation[t] = feature["property_" + t]
//             })
//           }

//           // tooltip용 마커 pointer-events none 설정
//           const aptm = document.querySelectorAll(".airPolTooltipMarker");
//           if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

//           // 마커 그리기(who 기준 or 건강영향도)
//           this.drawMarker(feature);

//           // // 초과사망자수 마커 pointer-events none 설정
//           // const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
//           // if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

//           naver.maps.Event.addListener(feature, 'click', (e) => {
//             if(!this.sideMenu) this.sideMenu = true;
            
//             // this.targetLocation = {
//             //   OverallDeath: feature.property_OverallDeath,
//             //   OverallDeathBeta: feature.property_OverallDeathBeta,
//             //   PM2_5: feature.property_PM2_5,
//             //   SIDO_CD: feature.property_SIDO_CD,
//             //   SIDO_NM: feature.property_SIDO_NM,
//             //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//             //   MaleOverallDeath: feature.property_MaleOverallDeath,
//             //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//             //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//             //   Index_total_PM10: feature.property_Index_total_PM10
//             // }
//             this.targetLocation = {}
            
//             this.getTargetLocationData.forEach((t)=>{
//               this.targetLocation[t] = feature["property_" + t]
//             })

//             // 클릭시 범례 dot 표시
//             if(this.airPolToggle) {
//               if(this.districtStandard != "sd") this.setLegendDot(feature.property_PM2_5, 40)
//               else this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date])
//             }
            
//             this.naverMap.data.overrideStyle(feature, {
//               strokeColor: '#000',
//               strokeWeight: 4
//             });
            
//             // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
//           });


//           naver.maps.Event.addListener(feature.mapMarker, 'click', () => {
//             // 부산(21), 대구(22), 인천(23)
//             if(["21", "22"].includes(feature.property_SIDO_CD)) {
//               this.naverMap.updateBy(feature.bounds.getCenter(),7);
//             } else if (feature.property_SIDO_CD == "23") {
//               const center = feature.bounds.getCenter();
//               this.naverMap.updateBy({x: center.x + 1, y: center.y},7);
//             } else {
//               this.naverMap.updateBy(feature.bounds.getCenter(),5);
//             }
//           });

//           naver.maps.Event.addListener(feature.mapMarker, 'mouseover', (e) => {
//             this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
//             if(this.airPolToggle) {
//               const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);              
//               const x = feature.bounds.getCenter().x + 0.2;
//               const y = feature.bounds.getCenter().y + 0.2;

//               feature.airPolTooltipMarker.setOptions({
//                 visible: true,
//                 position: {x: x, y:y},
//                 map: this.naverMap,
//                 icon: {
//                   content: 
//                     "<div class=airPolTooltipMarker style='display: block;'>" + 
//                       "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
//                       "<b>" + tooltipValue + "</b>" + "</p>" +
//                     "</div>",
//                   size: new naver.maps.Size(22, 35),
//                   anchor: new naver.maps.Point(11, 35),
//                 }
//               })
//             }
//           });

//           naver.maps.Event.addListener(feature, 'mouseover', (e) => {
//             this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
//             if(this.airPolToggle) {
//               let tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
//               let x = feature.bounds.getCenter().x + 0.2;
//               let y = feature.bounds.getCenter().y + 0.2;

//               feature.airPolTooltipMarker.setOptions({
//                 visible: true,
//                 position: {x: x, y:y},
//                 map: this.naverMap,
//                 icon: {
//                   content: 
//                     "<div class=airPolTooltipMarker style='display: block;'>" + 
//                       "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
//                       "<b>" + tooltipValue + "</b>" + "</p>" +
//                     "</div>",
//                   size: new naver.maps.Size(22, 35),
//                   anchor: new naver.maps.Point(11, 35),
//                 }
//               })
//             }
//           });

//           naver.maps.Event.addListener(feature.mapMarker, 'mouseout', (e) => { 
//             this.naverMap.data.overrideStyle(feature, {
//               strokeWeight: 2
//             });
//             if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//           });

//           naver.maps.Event.addListener(feature, 'mouseout', (e) => { 
//             this.naverMap.data.overrideStyle(feature, {
//               strokeWeight: 2
//             });
//             if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//           });
//         });

//         // 줌 변경시 지도 변경
//         this.naverMap.addListener('zoom_changed', (zoom) => {
//           if(!this.zoomChanged) return false;
//           this.mapOptions.zoom = zoom;
//           this.beforeZoom = zoom;
//           const beforeCheck = this.beforeZoom < 5 ? true : false
//           const currentCheck = zoom < 5 ? true : false
//           this.beforeZoom = zoom
//           if(beforeCheck && currentCheck) return null
//           else {
//             const center = this.naverMap.getCenter();
//             this.mapOptions.center = center
//             const ne = this.naverMap.getBounds().getNE()
//             const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
//             if(this.beforeZoom < 5) this.initSdMap();
//             else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//             else if(this.beforeZoom > 6) this.initSggMap();
//           }
//         });
//         resolve()
//       })
//     },
//     changeSggMapDrawing() {
//       // 지도 초기화
//       this.naverMap.data.setStyle((feature) => {
//         if(feature.property_SIDO_NM) return null
//         if(feature.property_group) return false;
//         if(feature.property_sigungu_nm == "울릉군") return null

//         let targetPm2_5Sgg = this.Pm2_5Sgg.find(r => {return String(r["SGG_CD"]) == feature.property_sigungu_cd });
//         let targetOverallDeathSgg = this.OverallDeathSgg.find(r => {return String(r["SGG_CD"]) == feature.property_sigungu_cd });
      
//         feature.property_PM2_5 = targetPm2_5Sgg[this.date];
//         feature.property_OverallDeath = targetOverallDeathSgg[this.date];
//         feature.property_sigungu_cd = targetOverallDeathSgg.SGG_CD;
//         feature.property_sigungu_nm = targetOverallDeathSgg.SGG_NM;

//         // 미세먼지 농도 Tooltip용 마커
//         feature.airPolTooltipMarker.setVisible(false)
        
//         // Tooltip용 마커 pointer-events none 설정
//         const aptm = document.querySelectorAll(".airPolTooltipMarker");
//         if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

//         //// airPol 색깔 및 css 옵션 설정
//         let qfc = this.airPolD3Linear(feature.property_PM2_5)
//         feature.airPolMainColor = qfc;
        
//         let styleOptions = {
//             fillColor: feature.airPolMainColor,
//             fillOpacity: 0.8,
//             strokeColor: '#555',
//             strokeWeight: 2,
//             strokeOpacity: 0.4,
//             strokeDasharray: 3
//         };

//         // 마커 그리기(who 기준 or 건강영향도)
//         this.drawMarker(feature);

//         // 초과사망자수 마커 pointer-events none 설정
//         const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
//         if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

//         return styleOptions;
//       });

//       this.naverMap.data.addListener('mouseover', (e) => {
//         let feature = e.feature;
//         if(feature.property_SIDO_NM) return null
//         if(feature.property_group) return false;
//         if(feature.property_sigungu_nm == "울릉군") return null
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 4
//         });
//         if(this.airPolToggle) {
          
//           // let tooltipValue = Math.floor(feature.locationData.pm2_5[this.date]) + this.unitText(this.airPolTopic);
          
//           let x = feature.bounds.getCenter().x + 0.06;
//           let y = feature.bounds.getCenter().y + 0.06;

//           feature.airPolTooltipMarker.setOptions({
//             visible: true,
//             position: {x: feature.bounds.getCenter().x+0.11, y: feature.bounds.getCenter().y},
//             map: this.naverMap,
//             icon: {
//               content: 
//                 "<div class=airPolTooltipMarker style='display: block;'>" + 
//                   "<p class='mb-0'>" + feature.property_sigungu_nm + "<br>" +
//                   "<b>" + tooltipValue + "</b>" + "</p>" +
//                 "</div>",
//               size: new naver.maps.Size(22, 35),
//               anchor: new naver.maps.Point(11, 35),
//             }
//           })
//         }
//       });

//       this.naverMap.data.addListener('mouseout', (e) => {
//         let feature = e.feature;
//         if(feature.property_SIDO_NM) return null
//         if(feature.property_group) return false;
//         if(feature.property_sigungu_nm == "울릉군") return null
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 2
//         });
//         if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//       });

//       this.naverMap.data.addListener('click', (e) => {
//         if(!this.sideMenu) this.sideMenu = true;
//         let feature = e.feature;
        
//         if(feature.property_SIDO_NM) return null
//         if(feature.property_group) return false;
//         if(feature.property_sigungu_nm == "울릉군") return null

//         // this.targetLocation = {
//         //   OverallDeath: feature.property_OverallDeath,
//         //   OverallDeathBeta: feature.property_OverallDeathBeta,
//         //   PM2_5: feature.property_PM2_5,
//         //   sigungu_cd: feature.property_sigungu_cd,
//         //   sigungu_nm: feature.property_sigungu_nm,
//         //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//         //   MaleOverallDeath: feature.property_MaleOverallDeath,
//         //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//         //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//         //   Index_total_PM10: feature.property_Index_total_PM10
//         // }

//         this.targetLocation = {}
            
//         this.getTargetLocationData.forEach((t)=>{
//           this.targetLocation[t] = feature["property_" + t]
//         })
        
//         // 클릭시 범례 dot 표시
//         if(this.airPolToggle) this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date])
        
//         // this.pathRevertStyle(feature);
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeColor: '#000',
//           strokeWeight: 4
//         });
//         // this.naverMap.panToBounds(feature.bounds,{}, this.panToBoundsOptions);
//         // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
//       });

//     },
//     initSggZoom5MapDrawing() { // zoom 5일 걍우 그룹지역만
//       // airpol 범례 추가
//       let airPolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
//       let airPolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
//       this.createAirPolD3Legend(airPolMin, airPolMax);

//       this.naverMap.data.setStyle((feature) => {
//         if(!feature.bounds) return false;

//         // 미세먼지 농도 Tooltip용 마커
//         feature.airPolTooltipMarker = new naver.maps.Marker({});

//         // Tooltip용 마커 pointer-events none 설정
//         const aptm = document.querySelectorAll(".airPolTooltipMarker");
//         if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

//         // airPol 색깔 및 css 옵션 설정
//         let qfc = this.airPolD3Linear(feature.property_PM2_5)
//         feature.airPolMainColor = qfc

//         // targetLocation이 이미 있으면 정보만 업데이트
//         if(this.targetLocation && this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {
//           // this.targetLocation = {
//           //   OverallDeath: feature.property_OverallDeath,
//           //   OverallDeathBeta: feature.property_OverallDeathBeta,
//           //   PM2_5: feature.property_PM2_5,
//           //   sigungu_cd: feature.property_sigungu_cd,
//           //   sigungu_nm: feature.property_sigungu_nm,
//           //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//           //   MaleOverallDeath: feature.property_MaleOverallDeath,
//           //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//           //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//           //   Index_total_PM10: feature.property_Index_total_PM10
//           // }
//           this.targetLocation = {}
            
//           this.getTargetLocationData.forEach((t)=>{
//             this.targetLocation[t] = feature["property_" + t]
//           })
//         }
        
//         let styleOptions = {
//             fillColor: feature.airPolMainColor,
//             fillOpacity: 0.8,
//             strokeColor: '#555',
//             strokeWeight: 2,
//             strokeOpacity: 0.4,
//             strokeDasharray: 3
//         };

//         // 마커 그리기(who 기준 or 건강영향도)
//         this.drawMarker(feature);

//         if(feature.property_group) {
//           naver.maps.Event.addListener(feature.mapMarker, 'click', (e) => {
//             // 부산(21), 대구(22), 인천(23)
//             if(["21000", "22000"].includes(feature.property_sigungu_cd)) {
//               this.naverMap.updateBy(feature.bounds.getCenter(),7);
//             } else if (feature.property_sigungu_cd == "23000") {
//               const center = feature.bounds.getCenter();
//               this.naverMap.updateBy({x: center.x + 1, y: center.y},7);
//             } else {
//               this.naverMap.updateBy(feature.bounds.getCenter(),7);
//             }
//           })
//         }
//         // 초과사망자수 마커 pointer-events none 설정
//         const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
//         if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

//         return styleOptions;
//       });

//       this.naverMap.data.addListener('mouseover', (e) => {
//         let feature = e.feature;
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 4
//         });

//         if(this.airPolToggle) {    
//           const x = feature.bounds.getCenter().x + 0.06;
//           const y = feature.bounds.getCenter();

//           const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
//           feature.airPolTooltipMarker.setOptions({
//             visible: true,
//             position: {x: feature.bounds.getCenter().x+0.11, y: feature.bounds.getCenter().y},
//             map: this.naverMap,
//             icon: {
//               content: 
//                 "<div class=airPolTooltipMarker style='display: block;'>" + 
//                   "<p class='mb-0'>" + feature.property_sigungu_nm + "<br>" +
//                   "<b>" + tooltipValue + "</b>" + "</p>" +
//                 "</div>",
//               size: new naver.maps.Size(22, 35),
//               anchor: new naver.maps.Point(11, 35),
//             }
//           });
//         }
//       });

//       this.naverMap.data.addListener('mouseout', (e) => {
//         let feature = e.feature;
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 2
//         });
//         if(this.airPolToggle) feature.airPolTooltipMarker.setVisible(false)
//       });

//       this.naverMap.data.addListener('click', (e) => {
//         if(!this.sideMenu) this.sideMenu = true;
//         let feature = e.feature;
        
//         // this.targetLocation = {
//         //   OverallDeath: feature.property_OverallDeath,
//         //   OverallDeathBeta: feature.property_OverallDeathBeta,
//         //   PM2_5: feature.property_PM2_5,
//         //   sigungu_cd: feature.property_sigungu_cd,
//         //   sigungu_nm: feature.property_sigungu_nm,
//         //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//         //   MaleOverallDeath: feature.property_MaleOverallDeath,
//         //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//         //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//         //   Index_total_PM10: feature.property_Index_total_PM10
//         // }
//         this.targetLocation = {}
        
//         this.getTargetLocationData.forEach((t)=>{
//           this.targetLocation[t] = feature["property_" + t]
//         })

//         // 클릭시 범례 dot 표시
//         if(this.airPolToggle) this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date])
        
//         // this.pathRevertStyle(feature);
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeColor: '#000',
//           strokeWeight: 4
//         });

//         // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
//       });

//       // 줌 변경시 지도 변경
//       this.naverMap.addListener('zoom_changed', (zoom) => {
//         if(!this.zoomChanged) return false;

//         this.mapOptions.zoom = zoom
//         this.beforeZoom = zoom

//         const center = this.naverMap.getCenter();
//         this.mapOptions.center = center
//         const ne = this.naverMap.getBounds().getNE()
//         // console.log("zoom_changed center :", center)
//         // console.log("zoom_changed ne :", ne)
//         const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
//         // console.log("zoom_changed distance :", distance)

//         if(this.beforeZoom < 5) this.initSdMap();
//         else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//         else if(this.beforeZoom > 6) this.initSggMap();
//       });


//       // 드래그 시
//       this.naverMap.addListener('dragend', () => {
//         const center = this.naverMap.getCenter();
//         this.mapOptions.center = center;
//         const ne = this.naverMap.getBounds().getNE();
//         if(this.beforeZoom < 5) this.initSdMap();
//         else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//         else if(this.beforeZoom > 6) this.initSggMap();
//       });
//     },

//     initSggMapDrawing() { // zoom 5일 걍우 그룹지역만
//       // airpol 범례 추가
//       let airPolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
//       let airPolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
//       this.createAirPolD3Legend(airPolMin, airPolMax);

//       this.naverMap.data.setStyle((feature) => {
//         if(!feature.bounds) return false;

//         // 미세먼지 농도 Tooltip용 마커
//         feature.airPolTooltipMarker = new naver.maps.Marker({});

//         // Tooltip용 마커 pointer-events none 설정
//         const aptm = document.querySelectorAll(".airPolTooltipMarker");
//         if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

//         // targetLocation이 이미 있으면 정보만 업데이트
//         if(this.targetLocation && this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {
//           // this.targetLocation = {
//           //   OverallDeath: feature.property_OverallDeath,
//           //   OverallDeathBeta: feature.property_OverallDeathBeta,
//           //   PM2_5: feature.property_PM2_5,
//           //   sigungu_cd: feature.property_sigungu_cd,
//           //   sigungu_nm: feature.property_sigungu_nm,
//           //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//           //   MaleOverallDeath: feature.property_MaleOverallDeath,
//           //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//           //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//           //   Index_total_PM10: feature.property_Index_total_PM10
//           // }
//           this.targetLocation = {}
            
//           this.getTargetLocationData.forEach((t)=>{
//             this.targetLocation[t] = feature["property_" + t]
//           })
//         }

//         // airPol 색깔 및 css 옵션 설정
//         let qfc = this.airPolD3Linear(feature.property_PM2_5)
//         feature.airPolMainColor = qfc
        
//         let styleOptions = {
//             fillColor: feature.airPolMainColor,
//             fillOpacity: 0.8,
//             strokeColor: '#555',
//             strokeWeight: 2,
//             strokeOpacity: 0.4,
//             strokeDasharray: 3
//         };
        
//         // 마커 그리기(who 기준 or 건강영향도)
//         this.drawMarker(feature);

//         // 초과사망자수 마커 pointer-events none 설정
//         const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
//         if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

//         return styleOptions;
//       });

//       this.naverMap.data.addListener('mouseover', (e) => {
//         let feature = e.feature;
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 4
//         });

//         if(this.airPolToggle) {
//           const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
              
//           const x = feature.bounds.getCenter().x + 0.025;
//           const y = feature.bounds.getCenter().y;
//           feature.airPolTooltipMarker.setOptions({
//             visible: true,
//             position: {x: x, y: y},
//             map: this.naverMap,
//             icon: {
//               content: 
//                 "<div class=airPolTooltipMarker style='display: block;'>" + 
//                   "<p class='mb-0'>" + feature.property_sigungu_nm + "<br>" +
//                   "<b>" + tooltipValue + "</b>" + "</p>" +
//                 "</div>",
//               size: new naver.maps.Size(22, 35),
//               anchor: new naver.maps.Point(11, 35),
//             }
//           })
//         }
//       });

//       this.naverMap.data.addListener('mouseout', (e) => {
//         let feature = e.feature;
//         // if(!feature.property_zoom_5) return null
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 2
//         });
//         if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//       });

//       this.naverMap.data.addListener('click', (e) => {
//         if(!this.sideMenu) this.sideMenu = true;
//         let feature = e.feature;
//         // this.targetLocation = {
//         //   OverallDeath: feature.property_OverallDeath,
//         //   OverallDeathBeta: feature.property_OverallDeathBeta,
//         //   PM2_5: feature.property_PM2_5,
//         //   sigungu_cd: feature.property_sigungu_cd,
//         //   sigungu_nm: feature.property_sigungu_nm,
//         //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//         //   MaleOverallDeath: feature.property_MaleOverallDeath,
//         //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//         //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//         //   Index_total_PM10: feature.property_Index_total_PM10
//         // }
//         this.targetLocation = {}
        
//         this.getTargetLocationData.forEach((t)=>{
//           this.targetLocation[t] = feature["property_" + t]
//         })

//         // 클릭시 범례 dot 표시
//         if(this.airPolToggle) this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date])
        
//         // this.pathRevertStyle(feature);
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeColor: '#000',
//           strokeWeight: 4
//         });

//         // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
//       });

//       // 줌 변경시 지도 변경
//       this.naverMap.addListener('zoom_changed', (zoom) => {
//         if(!this.zoomChanged) return false;

//         // console.log("=====initSggMapDrawing zoom_changed =====")
//         // console.log("before zoom : ", this.beforeZoom)
//         // console.log("changed zoom : ", zoom)
//         this.mapOptions.zoom = zoom
//         this.beforeZoom = zoom

//         const center = this.naverMap.getCenter();
//         this.mapOptions.center = center
//         const ne = this.naverMap.getBounds().getNE()
//         // console.log("zoom_changed center :", center)
//         // console.log("zoom_changed ne :", ne)
//         const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
//         // console.log("zoom_changed distance :", distance)
//         // console.log("this.naverMapProj.fromCoordToOffset(center) : ", this.naverMapProj.fromCoordToOffset(center))

      
//         // let beforeCheck = this.beforeZoom > 3 ? true : false
//         // let currentCheck = zoom > 3 ? true : false
//         // this.beforeZoom = zoom
//         // if(beforeCheck != currentCheck) {
//         //   if(zoom > 3) this.turnOnSggMap();
//         //   else this.turnOnSdMap();
//         // }

//         // if(this.beforeZoom < 5) this.initSdMap();
//         // else if(this.beforeZoom == 5) this.initSggZoom5Map();
//         // else if(this.beforeZoom > 5) this.initSggMap();

//         if(this.beforeZoom < 5) this.initSdMap();
//         else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//         else if(this.beforeZoom > 6) this.initSggMap();
//       });


//       // 드래그 시
//       this.naverMap.addListener('dragend', () => {
//         const center = this.naverMap.getCenter();
//         this.mapOptions.center = center;
//         const ne = this.naverMap.getBounds().getNE();
//         if(this.beforeZoom < 5) this.initSdMap();
//         else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//         else if(this.beforeZoom > 6) this.initSggMap();
//       });
//     },
//     searchSdMapDrawing() {
//         // // airpol 범례 추가
//         let airPolMin = Math.floor(this.Pm2_5SdStats.min[this.date]);
//         let airPolMax = Math.ceil(this.Pm2_5SdStats.max[this.date]);
//         this.createAirPolD3Legend(airPolMin, airPolMax);

//         // // 초과사망자수 범례 추가
//         let addrMin = this.OverallDeathSdStats.min[this.date];
//         let addrMax = this.OverallDeathSdStats.max[this.date];

//         this.naverMap.data.setStyle((feature) => {

//           // airPol 색깔 및 css 옵션 설정
//           feature.sdAirPolMainColor = null;
//           let fill_opacity = 0;
//           if(this.targetLocation.SIDO_CD == feature.property_SIDO_CD) {
//             let qfc = this.sdAirPolD3Linear(feature.property_PM2_5)
//             feature.sdAirPolMainColor = qfc
//             fill_opacity = 0.8
//             // 클릭시 범례 dot 표시
//             if(this.airPolToggle) {
//               if(this.districtStandard != "sd") this.setLegendDot(feature.property_PM2_5, 40)
//               else this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date])
//             }
//           }
          
//           let styleOptions = {
//               fillColor: feature.sdAirPolMainColor,
//               fillOpacity: fill_opacity,
//               strokeColor: '#555',
//               strokeWeight: 2,
//               strokeOpacity: 0.4,
//               strokeDasharray: 3
//           };

//           return styleOptions
//         })
//         // 지도 이벤트 설정
//         this.naverMap.data.forEach((feature) => {
//           if(feature.property_group) return false;
//           if(feature.property_sigungu_cd) return false;

//           // 미세먼지 농도 Tooltip용 마커
//           feature.airPolTooltipMarker = new naver.maps.Marker({
//             position: feature.bounds.getCenter(),
//             map: this.naverMap,
//             icon: {
//               content: "<div class='airPolTooltipMarker' style='display: none;'></div>",
//               size: new naver.maps.Size(22, 35),
//               anchor: new naver.maps.Point(11, 35),
//             }
//           });
//           // tooltip용 마커 pointer-events none 설정
//           const aptm = document.querySelectorAll(".airPolTooltipMarker");
//           if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";


//           if(this.targetLocation.SIDO_CD == feature.property_SIDO_CD) {
//             // 화면 위치 이동 
//             const center = feature.bounds.getCenter();
//             this.beforeZoom = 4
//             this.naverMap.updateBy({x: center.x-0.5, y: center.y},this.beforeZoom)
            
//             // 마커 그리기(who 기준 or 건강영향도)
//             this.drawMarker(feature);
            
//             naver.maps.Event.addListener(feature.mapMarker, 'click', () => {
//               if(["21", "22", "23"].includes(feature.property_SIDO_CD)) {
//                 this.naverMap.updateBy(feature.bounds.getCenter(),7);
//               } else {
//                 this.naverMap.updateBy(feature.bounds.getCenter(),5);
//               }
//             });

//             naver.maps.Event.addListener(feature.mapMarker, 'mouseover', (e) => {
//               this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
//               if(this.airPolToggle) {
//                 const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);              
//                 const x = feature.bounds.getCenter().x + 0.2;
//                 const y = feature.bounds.getCenter().y + 0.2;

//                 feature.airPolTooltipMarker.setOptions({
//                   visible: true,
//                   position: {x: x, y:y},
//                   map: this.naverMap,
//                   icon: {
//                     content: 
//                       "<div class=airPolTooltipMarker style='display: block;'>" + 
//                         "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
//                         "<b>" + tooltipValue + "</b>" + "</p>" +
//                       "</div>",
//                     size: new naver.maps.Size(22, 35),
//                     anchor: new naver.maps.Point(11, 35),
//                   }
//                 })
//               }
//             });

//             naver.maps.Event.addListener(feature.mapMarker, 'mouseout', (e) => { 
//               this.naverMap.data.overrideStyle(feature, {
//                 strokeWeight: 2
//               });
//               if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//             });

//           }
//           // 초과사망자수 마커 pointer-events none 설정
//           const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
//           if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.style["pointer-events"] = "none";

//           naver.maps.Event.addListener(feature, 'click', (e) => {
//             if(!this.sideMenu) this.sideMenu = true;
            
//             // this.targetLocation = {
//             //   OverallDeath: feature.property_OverallDeath,
//             //   OverallDeathBeta: feature.property_OverallDeathBeta,
//             //   PM2_5: feature.property_PM2_5,
//             //   SIDO_CD: feature.property_SIDO_CD,
//             //   SIDO_NM: feature.property_SIDO_NM,
//             //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//             //   MaleOverallDeath: feature.property_MaleOverallDeath,
//             //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//             //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//             //   Index_total_PM10: feature.property_Index_total_PM10
//             // }
//             this.targetLocation = {}
            
//             this.getTargetLocationData.forEach((t)=>{
//               this.targetLocation[t] = feature["property_" + t]
//             })

//             // 클릭시 범례 dot 표시
//             if(this.airPolToggle) {
//               if(this.districtStandard != "sd") this.setLegendDot(feature.property_PM2_5, 40)
//               else this.setLegendDot(feature.property_PM2_5, this.Pm2_5SdStats.max[this.date])
//             }
            
//             this.naverMap.data.overrideStyle(feature, {
//               strokeColor: '#000',
//               strokeWeight: 4
//             });
            
//             // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
//           });

//           naver.maps.Event.addListener(feature, 'mouseover', (e) => {
//             this.naverMap.data.overrideStyle(feature, {strokeWeight: 4});
//             if(this.airPolToggle) {
//               let tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
//               let x = feature.bounds.getCenter().x + 0.2;
//               let y = feature.bounds.getCenter().y + 0.2;

//               feature.airPolTooltipMarker.setOptions({
//                 visible: true,
//                 position: {x: x, y:y},
//                 map: this.naverMap,
//                 icon: {
//                   content: 
//                     "<div class=airPolTooltipMarker style='display: block;'>" + 
//                       "<p class='mb-0'>" + feature.property_SIDO_NM + "<br>" +
//                       "<b>" + tooltipValue + "</b>" + "</p>" +
//                     "</div>",
//                   size: new naver.maps.Size(22, 35),
//                   anchor: new naver.maps.Point(11, 35),
//                 }
//               })
//             }
//           });

//           naver.maps.Event.addListener(feature, 'mouseout', (e) => { 
//             this.naverMap.data.overrideStyle(feature, {
//               strokeWeight: 2
//             });
//             if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//           });
//         });

//         // 줌 변경시 지도 변경
//         this.naverMap.addListener('zoom_changed', (zoom) => {
//           if(!this.zoomChanged) return false;

//           // // console.log("------mounted zoom_changed------")
//           // console.log("before zoom : ", this.beforeZoom)
//           // console.log("changed zoom : ", zoom)
//           this.mapOptions.zoom = zoom;
//           this.beforeZoom = zoom;
          
//           const beforeCheck = this.beforeZoom < 5 ? true : false
//           const currentCheck = zoom < 5 ? true : false
//           this.beforeZoom = zoom
//           if(beforeCheck && currentCheck) return null
//           else {
//             const center = this.naverMap.getCenter();
//             this.mapOptions.center = center
//             const ne = this.naverMap.getBounds().getNE()
//             // console.log("zoom_changed center :", center)
//             // console.log("zoom_changed ne :", ne)
//             const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
//             // console.log("zoom_changed distance :", distance)
//             // if(this.beforeZoom == 5) this.initSggZoom5Map();
//             // else if(this.beforeZoom > 5) this.initSggMap();

//             if(this.beforeZoom < 5) this.initSdMap();
//             else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//             else if(this.beforeZoom > 6) this.initSggMap();
//           }
//         });
//     },
//     searchSggMapDrawing() { // zoom 5일 걍우 그룹지역만
//       // airpol 범례 추가
//       let airPolMin = Math.floor(this.Pm2_5SggStats.min[this.date]);
//       let airPolMax = Math.ceil(this.Pm2_5SggStats.max[this.date]);
//       this.createAirPolD3Legend(airPolMin, airPolMax);
      
//       this.naverMap.data.setStyle((feature) => {
//         if(!feature.bounds) return false;

//         // 미세먼지 농도 Tooltip용 마커
//         feature.airPolTooltipMarker = new naver.maps.Marker({
//           position: feature.bounds.getCenter(),
//           map: this.naverMap,
//           icon: {
//             content: "<div class='airPolTooltipMarker' style='display: none;'></div>",
//             size: new naver.maps.Size(22, 35),
//             anchor: new naver.maps.Point(11, 35),
//           }
//         });

//         // Tooltip용 마커 pointer-events none 설정
//         const aptm = document.querySelectorAll(".airPolTooltipMarker");
//         if(aptm[aptm.length-1]) aptm[aptm.length-1].parentNode.style["pointer-events"] = "none";

//         // airPol 색깔 및 css 옵션 설정
//         feature.airPolMainColor = null;
//         let fill_opacity = 0;
//         if(this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {
//           let qfc = this.airPolD3Linear(feature.property_PM2_5)
//           feature.airPolMainColor = qfc
//           fill_opacity = 0.8
          
//           // 클릭시 범례 dot 표시
//           if(this.airPolToggle) this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date])
//         }
        
//         let styleOptions = {
//             fillColor: feature.airPolMainColor,
//             fillOpacity: fill_opacity,
//             strokeColor: '#555',
//             strokeWeight: 2,
//             strokeOpacity: 0.4,
//             strokeDasharray: 3
//         };
//         return styleOptions;
//       });
      
//       this.naverMap.data.forEach((feature) => {
//         if(this.targetLocation.sigungu_cd == feature.property_sigungu_cd) {

//           // 화면 위치 이동
//           const center = feature.bounds.getCenter();
//           this.beforeZoom = 7
//           this.naverMap.updateBy({x: center.x-0.05, y: center.y},this.beforeZoom)

//           // 마커 그리기(who 기준 or 건강영향도)
//           this.drawMarker(feature);
//         }
//       });

//       this.naverMap.data.addListener('mouseover', (e) => {
//         let feature = e.feature;
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 4
//         });

//         if(this.airPolToggle) {
//           const tooltipValue = Math.floor(feature.property_PM2_5) + this.unitText(this.airPolTopic);
              
//           const x = feature.bounds.getCenter().x + 0.06;
//           const y = feature.bounds.getCenter();
//           feature.airPolTooltipMarker.setOptions({
//             visible: true,
//             position: {x: x, y: y},
//             map: this.naverMap,
//             icon: {
//               content: 
//                 "<div class=airPolTooltipMarker style='display: block;'>" + 
//                   "<p class='mb-0'>" + feature.property_sigungu_nm + "<br>" +
//                   "<b>" + tooltipValue + "</b>" + "</p>" +
//                 "</div>",
//               size: new naver.maps.Size(22, 35),
//               anchor: new naver.maps.Point(11, 35),
//             }
//           })
//         }
//       });

//       this.naverMap.data.addListener('mouseout', (e) => {
//         let feature = e.feature;
//         // if(!feature.property_zoom_5) return null
//         this.naverMap.data.overrideStyle(feature, {
//           strokeWeight: 2
//         });
//         if(this.airPolToggle) return feature.airPolTooltipMarker.setVisible(false)
//       });

//       this.naverMap.data.addListener('click', (e) => {
//         if(!this.sideMenu) this.sideMenu = true;
//         let feature = e.feature;
//         // this.targetLocation = {
//         //   OverallDeath: feature.property_OverallDeath,
//         //   OverallDeathBeta: feature.property_OverallDeathBeta,
//         //   PM2_5: feature.property_PM2_5,
//         //   sigungu_cd: feature.property_sigungu_cd,
//         //   sigungu_nm: feature.property_sigungu_nm,
//         //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//         //   MaleOverallDeath: feature.property_MaleOverallDeath,
//         //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//         //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//         // }
//         this.targetLocation = {}
        
//         this.getTargetLocationData.forEach((t)=>{
//           this.targetLocation[t] = feature["property_" + t]
//         })

//         // 클릭시 범례 dot 표시
//         if(this.airPolToggle) this.setLegendDot(feature.property_PM2_5, this.Pm2_5SggStats.max[this.date])
        
//         // this.pathRevertStyle(feature);
        
//         this.naverMap.data.overrideStyle(feature, {
//           strokeColor: '#000',
//           strokeWeight: 4
//         });

//         // this.naverMap.morph(feature.bounds.getCenter(), this.beforeZoom);
//       });

//       // // 줌 변경시 지도 변경
//       // this.naverMap.addListener('zoom_changed', (zoom) => {
//       //   if(!this.zoomChanged) return false;
//       //   console.log("=====initSggMapDrawing zoom_changed =====")
//       //   console.log("before zoom : ", this.beforeZoom)
//       //   console.log("changed zoom : ", zoom)
//       //   this.mapOptions.zoom = zoom
//       //   this.beforeZoom = zoom
//       //   const center = this.naverMap.getCenter();
//       //   this.mapOptions.center = center
//       //   const ne = this.naverMap.getBounds().getNE()
//       //   console.log("zoom_changed center :", center)
//       //   console.log("zoom_changed ne :", ne)
//       //   const distance = this.naverMapProj.getDistance(center, {x: center.x, y: ne.y})
//       //   console.log("zoom_changed distance :", distance)
//       //   console.log("this.naverMapProj.fromCoordToOffset(center) : ", this.naverMapProj.fromCoordToOffset(center))

      
//       //   // let beforeCheck = this.beforeZoom > 3 ? true : false
//       //   // let currentCheck = zoom > 3 ? true : false
//       //   // this.beforeZoom = zoom
//       //   // if(beforeCheck != currentCheck) {
//       //   //   if(zoom > 3) this.turnOnSggMap();
//       //   //   else this.turnOnSdMap();
//       //   // }
//       //   if(this.beforeZoom < 5) this.initSdMap();
//       //   else if(this.beforeZoom == 5) this.initSggZoom5Map();
//       //   else if(this.beforeZoom > 5) this.initSggMap();
//       // });


//       // // 드래그 시
//       // this.naverMap.addListener('dragend', () => {
//       //   const center = this.naverMap.getCenter();
//       //   this.mapOptions.center = center;
//       //   const ne = this.naverMap.getBounds().getNE();
//       //   if(this.beforeZoom < 5) this.initSdMap();
//       //   else if(this.beforeZoom == 5 || this.beforeZoom == 6) this.initSggZoom5Map();
//       //   else if(this.beforeZoom > 6) this.initSggMap();
//       // });
//     },
//     pathRevertStyle(f) {
//         if(this.clickedBeforePath) this.naverMap.data.revertStyle(this.clickedBeforePath);
//         if(f) this.clickedBeforePath = f;
//     },
//     toggleFilterSwitch(target) {
//       // this.pathRevertStyle();
//       if(target=="airpol") {
//         this.airPolToggle = !this.airPolToggle
//         if(this.airPolToggle) return this.onChangeAirPolDataFilter('PM2_5');
//         else return this.turnOffAirPolMap();
//       }
//       else if(target=="addr") {
//         this.addrToggle = !this.addrToggle
//         if(this.addrToggle) return this.onChangeAddrDataFilter(this.airPolTopic, 'ad');
//         else return this.turnOffAddrMap();
//       }
//     },
//     unitText(value) {
//       if (value == "PM2_5") return "㎍/㎥";
//       if (value == "PM10") return "㎍/㎥";
//       if (value == "NO2") return "ppm";
//       if (value == "ad") return "명";
//       return ""
//     },
//     setAirPolD3Linear(min, max) {
//       this.airPolD3Linear = d3.scale.linear()
//                                 .domain([min, max])
//                                 .range(['#FFF', '#2F3545']);
//     },
//     setSdAirPolD3Linear(min, max) {
//       this.sdAirPolD3Linear = d3.scale.linear()
//                                 .domain([min, max])
//                                 .range(['#FFF', '#2F3545']);
//     },
//     setAddrD3Quantize(min, max) {
//       this.addrD3Quantize = d3.scale.quantize()
//                                 .domain([min, max])
//                                 .range(d3.range(5).map((i) => { 
//                                     if (i != undefined) {return "p" + i; }
//                                 }));
//     },
//     setSdAddrD3Quantize(min, max) {
//       this.sdAddrD3Quantize = d3.scale.quantize()
//                                 .domain([min, max])
//                                 .range(d3.range(5).map((i) => { 
//                                     if (i != undefined) {return "p" + i; }
//                                 }));
//     },
//     createAirPolD3Legend(min, max) {
//       d3.select("#airpolLegend").html("");
      
//       let defs = d3.select("#airpolLegend").append("defs"),
//           linearGradient = defs.append("linearGradient")
//                                 .attr("id", "linear-gradient")
//                                 .attr("x1", "0%")
//                                 .attr("y1", "0%")
//                                 .attr("x2", "100%")
//                                 .attr("y2", "0%");
//       //Set the color for the start (0%)
//       linearGradient.append("stop")
//         .attr("offset", "0%")
//         .attr("stop-color", 'rgba(255, 255, 255, 0.8)')
//       //Set the color for the end (100%)
//       linearGradient.append("stop")
//         .attr("offset", "100%")
//         .attr("stop-color", 'rgba(47, 53, 69, 0.8)');
        
//       this.legendBarHeight = 20;
//       let airpolLegendRect = d3.select(" #airpolLegend").append("rect")
//           // .attr("width", "93%")
//           .attr("width", this.legendRectBoundsWidth)
//           .attr("height", this.legendBarHeight)
//           .attr("transform", "translate(" + this.legendDotMarginLeft + ",4)")
//           .style({
//             "fill": "url(#linear-gradient)", 
//             "stroke": "silver",
//             "stroke-width": "1px",
//           });
      
//       let legendRectBounds = d3.select("#airpolLegend rect").node().getBoundingClientRect();
//       // let legendRectBounds = airpolLegendRect.node().getBoundingClientRect();
//       let y = d3.scale.linear()
//         // .range([0, legendRectBounds.width])
//         .range([0, this.legendRectBoundsWidth])
//         .domain([0, Math.ceil(max/10)*10]);
      
//       let yAxis = d3.svg.axis()
//           .orient("bottom")
//           .ticks(5)
//           // .tickFormat(formatPercent)
//           .scale(y);
          
//       d3.select("#airpolLegend").append("g")
//         .attr("class", "y axis")
//         .attr("transform", "translate(" + this.legendDotMarginLeft + "," + (this.legendBarHeight + 4)+ ")")
//         .call(yAxis)
      
//       // 위치표기 dot
//       let legendDot = d3.select("#airpolLegend").append("g")
//         .attr("class", "legendDot")
//         .attr("transform", "translate(" + this.legendDotMarginLeft + "," + (this.legendBarHeight + 3) + ")");
//       legendDot.append('path');

//       legendDot.append('line');
//     },
//     createAddrD3Legend(qu, r, min, max) {
//       this.d3Legend = d3.legend.color()
//                               .labelFormat(d3.format(r == "RR" ? ".3f" : ".0f"))
//                               .useClass(true)
//                               .scale(qu);
//       d3.select("#addrLegend").call(this.d3Legend)
//     },
//     initLegendDot() {
//       d3.select(".legendDot").style("display", "none");
//     },
//     setLegendDot(val, max) {
//       d3.select(".legendDot").style("display", "inherit");
      
//       let maxEnd = Math.ceil(max/10)*10;
//       // let legendRectBounds = d3.select("#airpolLegend rect").node().getBoundingClientRect();
//       let arc = d3.svg.symbol().type('triangle-up').size(13);
//       d3.select("#airpolLegend .legendDot")
//         // .attr("transform", "translate(" + (this.legendDotMarginLeft + Math.floor(Math.floor(val)/maxEnd * (legendRectBounds.width))) + "," + (this.legendBarHeight + 3) + ")")
//         .attr("transform", "translate(" + (this.legendDotMarginLeft + Math.floor(Math.floor(val)/maxEnd * (this.legendRectBoundsWidth))) + "," + (this.legendBarHeight + 3) + ")")
//       d3.select("#airpolLegend .legendDot path")
//           .attr('d',arc)
//           .attr('fill', "rgb(47,48,56)")
//           .attr("transform", "translate(0,8)");
//       d3.select("#airpolLegend .legendDot line")
//           .attr("x1", 0)
//           .attr("y1", -this.legendBarHeight - 5)
//           .attr("x2", 0)
//           .attr("y2", 5)
//           .attr("stroke-width", 1)
//           .attr("stroke", "rgb(47,48,56)");
//     },
//     turnClassToColor (t) {
//       if(t=="p0") return "rgb(89,136,222)";
//       if(t=="p1") return "rgb(97,207,37)";
//       if(t=="p2") return "#fe9929";
//       if(t=="p3") return "#d95f0e";
//       if(t=="p4") return "#993404";
//     },
//     showModal () {
//       this.$refs.myModalRef.show();
//     },
//     hideModal () {
//       this.$refs.myModalRef.hide();
//     },
//     searchLocation() {
//       if(!this.searchQuery) return this.$toasted.error("검색어를 입력해주세요.")
//       // this.searchList = sggStat.filter(r => {return String(r["KOR_SGG_NM"]).includes(this.searchQuery) });
//       this.axios
//           .get("/districts", {params: {searchQuery: this.searchQuery}})
//           .then(res => {
//             if(res.data.result.length == 0) return this.$toasted.info("결과가 없습니다. 다시 검색해주세요.")
//             this.searchList =  res.data.result;
//           })
//           .catch(err => {
//             console.log('err : ', err)
//           })
//     },
//     goToSggMap(code, date) {
//       this.axios
//         .get("/districts/go/sgg", {params: {code, date}})
//         .then(res => {
//           this.naverMap.data.addGeoJson(res.data.result);

//           return new Promise((resolve, reject) => {
//             this.mapDownloadChecker.sggMap = true; 
//             this.beforeZoom = 7;
//             this.naverMap.data.forEach(feature => {
//               // this.targetLocation = {
//               //   OverallDeath: feature.property_OverallDeath,
//               //   OverallDeathBeta: feature.property_OverallDeathBeta,
//               //   PM2_5: feature.property_PM2_5,
//               //   sigungu_cd: feature.property_sigungu_cd,
//               //   sigungu_nm: feature.property_sigungu_nm,
//               //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//               //   MaleOverallDeath: feature.property_MaleOverallDeath,
//               //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//               //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//               //   Index_total_PM10: feature.property_Index_total_PM10
//               // }
//               this.targetLocation = {}
              
//               this.getTargetLocationData.forEach((t)=>{
//                 this.targetLocation[t] = feature["property_" + t]
//               })
//               // 화면 위치 이동
//               const center = feature.bounds.getCenter();
//               this.naverMap.updateBy({x: center.x-0.05, y: center.y},this.beforeZoom);
//             })
//             resolve()
//           })
//           .then(() => {
//             Promise.all([this.initSggMapData(), this.initPm2_5Sgg(), this.initOverallDeathSgg()]).then(()=>{
//               this.searchSggMapDrawing();
//               this.mapDownloadChecker.sggMap = true; 
//               this.isLoading=false;
//               this.zoomChanged = true;
//             })
//           })
//           .catch(err => {
//             console.log("err : ", err)
//           })
//         })
//         .catch(err => {
//           console.log("err : ", err)
//         })
//     },
//     goToSdMap(code, date) {
//       this.axios
//         .get("/districts/go/sd", {params: {code, date}})
//         .then(res => {
//           this.naverMap.data.addGeoJson(res.data.result);

//           return new Promise((resolve, reject) => {
//             this.mapDownloadChecker.sggMap = false; 
//             this.beforeZoom = 4;
//             this.naverMap.data.forEach(feature => {
//               // this.targetLocation = {
//               //   OverallDeath: feature.property_OverallDeath,
//               //   OverallDeathBeta: feature.property_OverallDeathBeta,
//               //   PM2_5: feature.property_PM2_5,
//               //   SIDO_CD: feature.property_SIDO_CD,
//               //   SIDO_NM: feature.property_SIDO_NM,
//               //   FemaleOverallDeath: feature.property_FemaleOverallDeath,
//               //   MaleOverallDeath: feature.property_MaleOverallDeath,
//               //   CerebralBloodVesselOverallDeath: feature.property_CerebralBloodVesselOverallDeath,
//               //   CerebralBreathOverallDeath: feature.property_CerebralBreathOverallDeath,
//               //   Index_total_PM10: feature.property_Index_total_PM10
//               // }
//               this.targetLocation = {}
            
//               this.getTargetLocationData.forEach((t)=>{
//                 this.targetLocation[t] = feature["property_" + t]
//               })
//             })
//             resolve()
//           })
//           .then(() => {
//             Promise.all([this.initSdMapData(), this.initPm2_5Sd(), this.initOverallDeathSd()]).then(()=>{
//               this.searchSdMapDrawing();
//               this.isLoading = false;
//               this.zoomChanged = true;
//             })
//           })
//           .catch(err => {
//             console.log("err : ", err)
//           })
//         })
//         .catch(err => {
//           console.log("err : ", err)
//         })
//     },
//     goToLocation(SGG_CD) {
//       // this.searchQuery = null;
//       this.zoomChanged = false; // zoom_changed 이벤트 영향 안받게
//       this.searchList = []; // 리스트 초기화
//       this.isLoading=true;
//       this.sideMenu = true;
//       const check =  SGG_CD.split("000");
//       const path = check[1] == "" ? "sd" : "sgg";
//       const code = check[1] == "" ? check[0] : SGG_CD;
//       this.naverMap = new naver.maps.Map('targetMap', this.mapOptions);
//       if(path == "sd") {
//         this.goToSdMap(code, this.date);
//       } else if(path == "sgg") {
//         this.goToSggMap(code, this.date)
//       }
//     },
//     cancelDetail(){
//       this.sideMenu = false;
//       if(this.searchQuery) {
//         // 검색 후 취소버튼 클릭시 한 지역 포커싱 취소
//         this.searchQuery = null;
//         if(this.beforeZoom < 5) this.initSdMapDrawing();
//         else if(this.beforeZoom == 5) this.initSggZoom5MapDrawing();
//         else if(this.beforeZoom > 5) this.initSggMapDrawing();
//       }
//     },
//     setToInitMap() {
//       this.targetLocation = null;
//       this.naverMap.updateBy(new naver.maps.LatLng(this.firstMapLat, this.firstMapLng), this.zoom);
//       this.initLegendDot();
//     },
//     initUserLocationMarker() {
//       this.userLocationMarker = new naver.maps.Marker({
//         visible: false,
//         position: this.getUserLocation,
//         map: this.naverMap,
//         zIndex: 10
//       });
//     },
//     showLocationError(error) {
//       switch(error.code) {
//         case error.PERMISSION_DENIED:
//             this.$toasted.error("위치정보 공유를 허가해야 사용가능합니다.")
//             break;
//         case error.POSITION_UNAVAILABLE:
//             this.$toasted.error("위치정보를 이용할 수 없습니다.")
//             break;
//         case error.TIMEOUT:
//             this.$toasted.error("The request to get user location timed out.")
//             break;
//         case error.UNKNOWN_ERROR:
//             this.$toasted.error("An unknown error occurred.")
//             break;
//       }
//     },
//     setToUserLocation() {
//       // set 유저 현위치정보
//       this.isLoading = true;
//       navigator.geolocation.getCurrentPosition(position => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         this.getUserLocation = new naver.maps.LatLng(lat,lng);

//         if(this.getUserLocation) {
          
//           this.userLocationMarker.setVisible(true)
//           const x = this.getUserLocation.x - 0.05
//           const y = this.getUserLocation.y
//           this.naverMap.updateBy({x,y}, 8);
//           // this.naverMap.panToBounds(this.getUserLocation,{}, this.panToBoundsOptions);
//           // this.naverMap.morph({x,y}, 8, this.panToBoundsOptions);
//           naver.maps.Service.reverseGeocode({
//               location: this.getUserLocation,
//           }, (status, response) => {
//             if (status !== naver.maps.Service.Status.OK) {
//               return alert('GPS Something wrong!');
//             }

//             var result = response.result, // 검색 결과의 컨테이너
//                 items = result.items; // 검색 결과의 배열
//             const SD_NM = items[0].addrdetail.sido;
//             const SGG_NM = items[0].addrdetail.sigugun

//             this.axios
//               .get("/districts/certain", {params: {date: this.date, SD_NM, SGG_NM}})
//               .then(res => {
//                 if(res.data.result) {
//                   this.targetLocation = {}
            
//                   this.getTargetLocationData.forEach((t)=>{
//                     this.targetLocation[t] = res.data.result[t];
//                   })
//                   this.targetLocation.sigungu_cd = res.data.result.SGG_CD; // 시군구, 시도 properity 명을 통일하지 않아서 생긴 오류
//                   this.targetLocation.sigungu_nm = res.data.result.SGG_NM; // 시군구, 시도 properity 명을 통일하지 않아서 생긴 오류

//                   this.sideMenu = true;
//                   this.isLoading = false;
//                 } else {
//                   this.$toasted.info("결과가 없습니다.")
//                 }
//               })
//           });
//         } else {
//           this.isLoading = false;
//           return this.$toasted.info("위치정보 접근을 허용하셔야합니다.")
//         }
//       }, this.showLocationError)
//     },
//     onChangeAirPolDataFilter(data) {
//       this.isLoading = true;
//       return new Promise((resolve, reject) => {
//         this.airPolTopic = data;
//         this.addrTopic = false;
//         this.naverMap.data.setStyle((feature) => {
          
//           let styleOptions = {
//               fillColor: feature.airPolMainColor,
//               fillOpacity: 0.8,
//               strokeOpacity: 0.4,
//           };
//           return styleOptions;
//         });
//         resolve()
//       }).then(res => {
//         this.isLoading = false;
//       }).catch((err) => {
//         console.log('then error : ', err); // then error :  Error: Error in then()
//       });
//     },
//     onChangeAddrDataFilter(airPol, addr) {
//       this.isLoading = true;
//       return new Promise((resolve, reject) => {
//         this.airPolTopic = airPol;
//         this.addrTopic = addr;

//         this.naverMap.data.forEach((feature) => {
//           if(this.naverMap.getZoom() > 3 ) {
//             if(feature.mapMarker) return feature.mapMarker.setVisible(true)
//           } else {
//             if(feature.mapMarker) return feature.mapMarker.setVisible(true)
//           }
//         });
//         resolve();
//       }).then(res => {
//         this.isLoading = false;
//       }).catch((err) => {
//         console.log('then error : ', err); // then error :  Error: Error in then()
//       });
//     },
//     turnOffAirPolMap () {
//       this.naverMap.data.setStyle((feature) => {
//         let styleOptions = {
//           fillOpacity: 0,
//           // strokeOpacity: 0
//         }
//         return styleOptions;
//       });
//     },
//     turnOffAddrMap () {
//       this.naverMap.data.setStyle((feature) => {
//         if(feature.mapMarker) feature.mapMarker.setVisible(false);
//         else feature.mapMarker.setVisible(false);
//       });
//     },
//     whoStandardChange() {
//       this.whoStandard = !this.whoStandard
      
//       const viewIcon = this.beforeZoom > 5 ? '' : '<img class="view" src="https://png.icons8.com/material-outlined/80/000000/search.png">'
//       this.naverMap.data.forEach(feature => {
//         // 마커 그리기(who 기준 or 건강영향도)
//         this.drawMarker(feature);
//       });
//     },
//     setMarkerPoint(feature) {
//       // 초과사망자수 마커 위치설정
//       if(feature.property_SIDO_NM) {
//         let point = feature.bounds.getCenter(); 
//         switch (feature.property_SIDO_NM) {
//           case "경기도":
//             point.y = feature.bounds.getCenter().y - 0.3;
//             break;
//           case "인천광역시":
//             point.x = feature.bounds.getCenter().x + 0.5;
//             break;
//           case "서울특별시":
//             point.x = feature.bounds.getCenter().x - 0.3;
//             point.y = feature.bounds.getCenter().y + 0.25;
//             break;
//           case "충청북도":
//             point.y = feature.bounds.getCenter().y + 0.1;
//             break;
//           case "충청남도":
//             point.x = feature.bounds.getCenter().x - 0.8;
//             point.y = feature.bounds.getCenter().y + 0.1;
//             break;
//           case "세종특별자치시":
//             point.x = feature.bounds.getCenter().x - 0.4;
//             point.y = feature.bounds.getCenter().y + 0.1;
//             break;
//           case "대전광역시":
//             point.y = feature.bounds.getCenter().y - 0.2;
//             break;
//           case "경상북도":
//             point.x = feature.bounds.getCenter().x - 0.6;
//             point.y = feature.bounds.getCenter().y - 0.1;
//             break;
//           case "울산광역시":
//             point.x = feature.bounds.getCenter().x + 0.25;
//             point.y = feature.bounds.getCenter().y - 0.1;
//             break;
//         }
//         return point;
//       } else if(feature.property_sigungu_nm)  {
//         let point = feature.bounds.getCenter();
//         switch (feature.property_sigungu_nm) {
//           case "강북":
//             point.y = feature.bounds.getCenter().y + 0.05;
//             break;
//           case "인천광역시":
//             point.x = feature.bounds.getCenter().x + 0.8;
//             break;
//           case "북구":
//             point.y = feature.bounds.getCenter().y + 0.05;
//             break;
//           case "중구":
//             point.x = feature.bounds.getCenter().x - 0.05
//             point.y = feature.bounds.getCenter().y + 0.05
//             break;
//           case "진해구":
//             point.x = feature.bounds.getCenter().x + 0.05
//             break;
//           case "마산합포구":
//             point.y = feature.bounds.getCenter().y - 0.05
//             break;
//           case "의창구":
//             point.y = feature.bounds.getCenter().y + 0.05
//             break;
//           case "담양군":
//             point.x = feature.bounds.getCenter().x + 0.05
//             break;
//           case "남구":
//             point.y = feature.bounds.getCenter().y - 0.05
//             break;
//         }
//         return point;
//       }
//     },
//     drawMarker(feature) {
//       const position = this.setMarkerPoint(feature);

//       if(!feature.mapMarker) feature.mapMarker = new naver.maps.Marker({})
//       const viewIcon = this.beforeZoom > 5 ? '' : '<img class="view" src="https://png.icons8.com/material-outlined/80/000000/search.png">'
      
//       if(!this.whoStandard) {
//         feature.mapMarker.setOptions({
//           position,
//           map: this.naverMap,
//           icon: {
//             content: 
//               "<div class='mapMarkerWrapperOver " + "step-" + this.$options.filters.index_total_PM10_for_class_filter(feature.property_Index_total_PM10) + "' style='background-color: white; margin: auto;'>" + 
//                 "<p class='inCurcle'>" + 
//                   "<span class='title'>건강영향도</span><br>" + 
//                   "<span class='overdeath_value'>" + this.$options.filters.index_total_PM10_filter(feature.property_Index_total_PM10) + "</span><br>" +
//                   viewIcon +
//                   '<img class="warning" src="https://img.icons8.com/material-sharp/48/c02b1f/error.png">' +
//                   '<span style="color: gray; font-size:13px;">' + (feature.property_OverallDeathBeta).toFixed(3) + '</span>' +
//                 "</p>" +
//                 // "<div class='labelWrapper'>" +
//                 //   "<p class='label sd_nm'>" + (feature.property_sigungu_nm || feature.property_SIDO_NM) + "</p>" +
//                 //   "<p class='label sd_nm'>" + Math.floor(feature.property_PM2_5) +  this.unitText(this.airPolTopic) + "</p>" +
//                 // "</div>" +
//               "</div>" +
//               "<div class='mapMarkerlabelWrapper text-center'>" +
//                 "<p class='label sd_nm'>" + (feature.property_sigungu_nm || feature.property_SIDO_NM) + "</p>" +
//                 "<p class='label sd_nm'>" + Math.floor(feature.property_PM2_5) +  this.unitText(this.airPolTopic) + "</p>" +
//               "</div>" ,
//             size: new naver.maps.Size(22, 35),
//             anchor: new naver.maps.Point(11, 35),
//           }
//         });
//       } else {
//         const pm2_5 = Math.floor(feature.property_PM2_5) - 25 < 0 ? 0 : Math.floor(feature.property_PM2_5) - 25 * feature.property_OverallDeath

//         feature.mapMarker.setOptions({
//           position,
//           map: this.naverMap,
//           icon: {
//             content: 
//               "<div class='mapMarkerWrapperOver' style='background-color: white;margin: auto;'>" + 
//                 "<p class='inCurcle'>" + 
//                   "<span class='title'>건강영향도</span><br>" + 
//                   "<span class='overdeath_value' style='color:tomato;'>" + pm2_5 + "명</span><br>" +
//                   viewIcon +
//                   '<img class="warning" src="https://img.icons8.com/material-sharp/48/c02b1f/error.png">' +
//                   '<span style="color: gray; font-size:13px;">' + (feature.property_OverallDeathBeta).toFixed(3) + '</span>' +
//                 "</p>" +
//               "</div>" +
//               "<div class='mapMarkerlabelWrapper text-center'>" +
//                 "<p class='label sd_nm'>" + (feature.property_sigungu_nm || feature.property_SIDO_NM) + "</p>" +
//                 "<p class='label sd_nm'>" + Math.floor(feature.property_PM2_5) +  this.unitText(this.airPolTopic) + "</p>" +
//               "</div>" ,
//             size: new naver.maps.Size(22, 35),
//             anchor: new naver.maps.Point(11, 35),
//           }
//         });
//       }
//       // 초과사망자수 마커 pointer-events none 설정
//       const amwo = document.querySelectorAll(".mapMarkerWrapperOver");
//       if(amwo[amwo.length-1]) amwo[amwo.length-1].parentNode.parentNode.style["pointer-events"] = "none";
//     },
//   }
// }
// </script>
