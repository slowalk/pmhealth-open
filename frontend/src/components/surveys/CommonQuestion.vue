<template lang="pug">
  .container
    step-progress(:currentStep=1)
    br
    b-form(@submit="onSubmit")
      b-form-group(class="mb-5")
        h5 올해 만 나이는 몇 세입니까?
        b-form-input(id="age"
                        type="number"
                        v-model="form.age"
                        aria-describedby="ageHelp"
                        
                        :state="ageUnderLimit"
                        placeholder="나이(숫자)")
        //- b-form-invalid-feedback 최소 15세 이상으로 입력해주세요.
        b-form-text(id="ageHelp") 숫자만 입력해주세요.
      
      b-form-group(class="mb-5")
        h5 성별은 무엇입니까?
        b-form-radio-group(id="gender" v-model="form.gender" :options="formOptions.gender" name="gender"  stacked)
       
      b-form-group(class="mb-5")
        h5 현재 소속 대학/대학원은 어느 곳입니까?
        b-form-select(id="belong" v-model="form.belong" :options="formOptions.belong" )

      b-form-group(class="mb-5")
        h5 혼인 상태는 어떻게 되십니까?
        b-form-radio-group(id="marriage" v-model="form.marriage" :options="formOptions.marriage" name="marriage"  stacked)

      b-form-group(class="mb-5")
        h5 가정에 미취학 자녀(만 6세 이하)가 있습니까?
        b-form-radio-group(id="kid" v-model="form.kid" :options="formOptions.kid" name="kid"  stacked)

      b-form-group(class="mb-5")
        h5 평소 귀하의 건강상태는 어떠합니까?
        b-row
          b-col(cols="2")
            p.text-right 매우 나쁘다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.health"
            //-   v-bind="formOptions.defaultForm"
            //- )
            b-form-radio-group(v-model="form.health" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 좋다
        
      b-form-group(class="mb-5")
        h5 현재 건강상의 문제나 신체 혹은 정신적 장애로 일상생활 및 사회활동에 제한을 받고 계십니까?
        b-form-radio-group(id="handicap" v-model="form.handicap" :options="formOptions.boolean" name="handicap"  stacked)

      b-form-group(class="mb-5" v-if="form.handicap == '예'")
        h5 일상 활동에 제한을 가져온 이유는 무엇입니까?
        b-form-checkbox-group(v-model="form.handicapReason" name="handicapReason" id="handicapReason" :options="formOptions.handicapReason" stacked)
        b-form-input(
                      v-if="form.handicapReason && form.handicapReason.includes('기타')"
                      type="text"
                      v-model="form.handicapReasonETC"
                      id="handicapReasonETC"
                      
                      placeholder="일상 활동에 제한을 가져온 질환을 적어주세요.")

      
      b-form-group(class="mb-5")
        h5 최근 2주 동안 입원을 하지않고, 병의원(치과 포함)이나 보건소, 한의원에서 치료를 받은 적이 있습니까?
        b-form-radio-group(id="health2weaksAgo" v-model="form.health2weaksAgo" :options="formOptions.boolean" name="health2weaksAgo"  stacked)
      
      b-form-group(class="mb-5" v-if="form.health2weaksAgo == '예'")
        h5 최근 2주 동안 입원을 하지 않고, 병의원(치과 포함)이나 보건소, 한의원에서 치료를 몇 번 받았습니까?
        b-form-input(id="health2weaksAgoNumber"
                        type="number"
                        v-model="form.health2weaksAgoNumber"
                        aria-describedby="health2weaksAgoNumber"
                        
                        placeholder="횟수")
        b-form-text(id="health2weaksAgoNumber") 숫자만 입력해주세요.
      
      //- 문10
      b-form-group(class="mb-5")
        h5 현재 담배를 피우고 계십니까?
        b-form-radio-group(id="cigar" v-model="form.cigar" :options="formOptions.cigar" name="cigar"  stacked)
      
      //- 문10-1
      b-form-group(class="mb-5" v-if="form.cigar == '현재 매일 피움'")
        h5 하루평균 흡연량은 몇 개비나 됩니까?
        b-form-input(id="cigarOneDay"
                        type="number"
                        v-model="form.cigarOneDay"
                        aria-describedby="cigarOneDay"
                        
                        placeholder="개비수")
        b-form-text(id="cigarOneDay") 숫자만 입력해주세요.
      
      //- 문10-2
      b-form-group(class="mb-5" v-if="form.cigar == '가끔 피움'")
        h5 최근 1개월간 흡연 일수는 몇일입니까?
        b-form-input(id="cigarOneMonth"
                        type="number"
                        v-model="form.cigarOneMonth"
                        aria-describedby="cigarOneMonth"
                        
                        :state="checkCigarOneMonth"
                        placeholder="일수")
        b-form-invalid-feedback 31일 이하의 수만 적어주세요.
        b-form-text(id="cigarOneMonthText") 숫자만 입력해주세요.

      //- 문10-3
      b-form-group(class="mb-5" v-if="form.cigar == '과거에는 피웠으나 현재 피우지 않음(앞으로도 계속 금연)'")
        h5 흡연 중단 시기는 언제입니까?
        b-form-input(id="cigarStopDay"
                        type="date"
                        v-model="form.cigarStopDay"
                        aria-describedby="cigarStopDay"
                        
                        :state="cigarStopDayYear"
                        placeholder="개수")
        b-form-invalid-feedback 1950년 이후로 설정해주세요.
        b-form-text(id="cigarStopDayHelp") 숫자만 입력해주세요.
        
      //- 문11
      b-form-group(class="mb-5")
        h5 귀하는 일반적으로 위험을 피하기보다는 위험을 감수하는 편입니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 그렇지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.challenge"
            //-   v-bind="formOptions.defaultForm"
            //- )
            b-form-radio-group(v-model="form.challenge" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 그렇다

      b-form-group(class="mb-5")
        h5 급하게 이동 중인 상황에서 교차로를 건널 때, 신호등의 신호가 바뀌기 직전이라면 귀하는 멈추지 않고 지나가는 편입니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 그렇지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.challengeNonStop"
            //-   v-bind="formOptions.defaultForm"
            //- )
            b-form-radio-group(v-model="form.challengeNonStop" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 그렇다

      b-form-group(class="mb-5")
        h5 귀하는 알코올이 건강에 다소 나쁜 영향을 미친다고 할지라도 기분 전환, 친목 유지, 사회생활 등 음주로 인한 이익을 추구하시겠습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 그렇지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.alcohol"
            //-   v-bind="formOptions.defaultForm"
            //- )
            b-form-radio-group(v-model="form.alcohol" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 그렇다
      
      b-form-group(class="mb-5")
        h5 향후 5년 이내, 다음의 각 항목으로 인한 위험이 발생할 가능성은 어느 정도라고 생각하십니까?
        br
        p.mb-1.text-center 신종감염병 (예: 메르스)	
        b-row
          b-col(cols="2")
            p.text-right 전혀 높지 않다	
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.mersc"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.mersc" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 높다

        p.mb-1.text-center 방사능 누출(예: 원전 사고)
        b-row
          b-col(cols="2")
            p.text-right 전혀 높지 않다	
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.radiation"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.radiation" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 높다

        p.mb-1.text-center 자연재해(예: 포항지진)
        b-row
          b-col(cols="2")
            p.text-right 전혀 높지 않다	
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.nd"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.nd" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 높다

        p.mb-1.text-center 사회적 재난(예: 세월호 참사)
        b-row
          b-col(cols="2")
            p.text-right 전혀 높지 않다	
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.sd"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.sd" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 높다

        p.mb-1.text-center 생활화학제품 안전사고(예: 가습기살균제 사건)
        b-row
          b-col(cols="2")
            p.text-right 전혀 높지 않다	
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.pd"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.pd" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 높다

        p.mb-1.text-center 환경화학물질 노출(예: 미세먼지로 인한 건강문제)
        b-row
          b-col(cols="2")
            p.text-right 전혀 높지 않다	
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.cd"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.cd" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 높다

      b-form-group(class="mb-5")
        h5 위의 위험이 발생하였을 때, 그 심각성은 각각 어느 정도일 것이라고 생각하십니까?
        br
        p.mb-1.text-center 신종감염병 (예: 메르스)	
        b-row
          b-col(cols="2")
            p.text-right 전혀 심각하지 않다	
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.merscDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.merscDeep" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 심각하다

        p.mb-1.text-center 방사능 누출(예: 원전 사고)
        b-row
          b-col(cols="2")
            p.text-right 전혀 심각하지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.radiationDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.radiationDeep" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 심각하다

        p.mb-1.text-center 자연재해(예: 포항지진)
        b-row
          b-col(cols="2")
            p.text-right 전혀 심각하지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.ndDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.ndDeep" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 심각하다

        p.mb-1.text-center 사회적 재난(예: 세월호 참사)
        b-row
          b-col(cols="2")
            p.text-right 전혀 심각하지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.sdDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.sdDeep" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 심각하다

        p.mb-1.text-center 생활화학제품 안전사고(예: 가습기살균제 사건)
        b-row
          b-col(cols="2")
            p.text-right 전혀 심각하지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.pdDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.pdDeep" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 심각하다

        p.mb-1.text-center 환경화학물질 노출(예: 미세먼지로 인한 건강문제)
        b-row
          b-col(cols="2")
            p.text-right 전혀 심각하지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.cdDeep"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.cdDeep" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 심각하다

      
      b-form-group(class="mb-5")
        h5 가장 선호하는 정보 유형은 어떤 것입니까? 
        b-form-radio-group(id="infoType" v-model="form.infoType" :options="formOptions.infoType" name="infoType"  stacked)

      b-form-group(class="mb-5")
        h5 가장 선호하는 정보 제공 방식은 어떤 것입니까?
        b-form-radio-group(id="preferInfoType" v-model="form.preferInfoType" :options="formOptions.preferInfoType" name="preferInfoType"  stacked)

      b-form-group(class="mb-5")
        h5 맞춤형 정보를 어떻게 생각하십니까? (예: 페이스북 광고, 유튜브 추천 영상, 음악 어플의 추천 음악 등)
        b-row
          b-col(cols="2")
            p.text-right 매우 부정적이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.customInfo"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.customInfo" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 긍정적이다

      b-form-group(class="mb-5")
        h5 건강정보 관련 맞춤형 정보를 어떻게 생각하십니까? (예: 개인 맞춤형 운동 처방, 맞춤형 보건교육 등) 
        b-row
          b-col(cols="2")
            p.text-right 매우 부정적이다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.customHealthInfo"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.customHealthInfo" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 긍정적이다

      b-form-group(class="mb-5")
        h5 귀하는 다음의 설명에 동의하십니까? 각 항목에 대해 귀하의 생각과 가장 가까운 답을 선택해주십시오 
        p.semiTitle.mb-1.text-center 나는 ‘과학 전문용어’로 이루어진 건강 정보를 이해하는 것이 어렵다
        b-row
          b-col(cols="2")
            p.text-right 아니다, 쉽게 이해할 수 있다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.understandExpert"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.understandExpert" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 그렇다, 이해하기 어렵다

        p.semiTitle.mb-1.text-center 나는 ‘숫자’로 이루어진 건강 정보를 이해하는 것이 어렵다
        b-row
          b-col(cols="2")
            p.text-right 아니다, 쉽게 이해할 수 있다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.understandNumber"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.understandNumber" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 그렇다, 이해하기 어렵다

      b-form-group(class="mb-5")
        h5 귀하는 건강 정보를 주로 어디에서 접하십니까? 가장 많이 접하는 종류 한 가지만 선택해주십시오
        b-form-radio-group(v-model="form.infoSource" name="infoSource" :options="formOptions.infoSource"  stacked)
        b-form-input(
                      v-if="form.infoSource && form.infoSource.includes('기타')"
                      type="text"
                      v-model="form.infoSourceETC"
                      
                      placeholder="매체명을 적어주세요.")

      b-form-group(class="mb-5")
        h5 귀하와 비슷한 나이대의 사람들과 비교하였을 때, 향후 5년 이내 귀하가 미세먼지로 인해 입을 건강 피해는 어느 정도라고 생각하십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 없다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.compareHealth"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.compareHealth" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 심각하다

      b-form-group(class="mb-5")
        h5 미세먼지로 인한 건강 피해에 대해 알고 계십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 모른다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.dustDamage"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.dustDamage" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 잘 알고있다

      b-form-group(class="mb-5")
        h5 귀하는 2017년 9월 정부가 발표한 ‘미세먼지 관리 종합대책’에 대해 얼마나 알고 계십니까? 
        b-row
          b-col(cols="2")
            p.text-right 전혀 모른다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.dust2017Gov"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.dust2017Gov" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 잘 알고있다

      b-form-group(class="mb-5")
        h5 귀하는 환경부에서 발표한 ‘미세먼지 국민행동요령’에 대해 얼마나 알고 계십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 모른다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.dustReact"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.dustReact" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 잘 알고있다

      b-form-group(class="mb-5")
        h5 귀하는 2005년 12월부터 환경부에서 제공 중인 전국 실시간 대기 오염도 공개 홈페이지 ‘에어코리아’에 대해 알고 계십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 모른다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.airKorea"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.airKorea" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 잘 알고있다

      b-form-group(class="mb-5")
        h5 미세먼지 위험으로 인한 문제 해결의 책임은 누구에게 있다고 생각하십니까?
        b-row
          b-col(cols="2")
            p.text-right 개인
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.obl"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.obl" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 국가

      b-form-group(class="mb-5")
        h5 미세먼지 관련 정보를 얼마나 자주 찾아보십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 찾아보지 않는다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.oftenSearch"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.oftenSearch" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매일 찾아본다

      b-form-group(class="mb-5")
        h5 아래 ‘미세먼지 국민행동요령’ 중 가장 많이 실천하는 행동은 무엇입니까?
        b-form-radio-group(id="realAction" v-model="form.realAction" :options="formOptions.realAction" name="realAction"  stacked)

      b-form-group(class="mb-5")
        h5 앞서 선택한 미세먼지 행동 요령을 얼마나 자주 실천하십니까?
        b-row
          b-col(cols="2")
            p.text-right 일주일 중 하루 실천
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.howOftenAction"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.howOftenAction" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 일주일 중 5일 이상 실천

      b-form-group(class="mb-5")
        h5 귀하는 ‘미세먼지 국민행동요령’을 읽고 실천하는 것이 미세먼지로부터의 건강 위험을 막는 효과적인 방법이라고 생각하십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 효과적이지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.isThatEffect"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.isThatEffect" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 효과적이다

      b-form-group(class="mb-5")
        h5 귀하가 접했던 미세먼지 관련 정보는 이해하기 쉬웠습니까?
        b-row
          b-col(cols="2")
            p.text-right 매우 쉬웠다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.difficulty"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.difficulty" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 어려웠다

      b-form-group(class="mb-5")
        h5 귀하는 정부가 제공한 미세먼지에 대한 정보를 얼마나 신뢰하십니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 믿지않는다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.trust"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.trust" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 완전히 믿는다

      b-form-group(class="mb-5")
        h5 귀하는 어떤 미세먼지 정보에 관심이 있습니까? 최대 두 가지만 선택해주십시오
        b-form-checkbox-group(id="interest" v-model="form.interest" :options="formOptions.interest" name="interest" @input="interestCheckBox()" stacked)
        b-form-input(
                      v-if="form.interest && form.interest.includes('기타')"
                      type="text"
                      v-model="form.interestETC"
                      
                      placeholder="관심 정보를 적어주세요")

      b-form-group(class="mb-5" id="enough")
        h5 귀하는 미세먼지에 대해 궁금했던 정보를 충분히 얻을 수 있었습니까?
        b-row
          b-col(cols="2")
            p.text-right 전혀 그렇지 않다
          b-col(cols="8")
            //- vue-slider(
            //-   v-model="form.enough"
            //-   v-bind="formOptions.defaultForm"
            //-   class="mb-5"
            //- )
            b-form-radio-group(v-model="form.enough" class="text-center" )
              b-row
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="1") 1
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="2") 2
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="3") 3
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="4") 4
                b-col(cols="2" class="mr-auto ml-auto")
                  b-form-radio(value="5") 5
          b-col(cols="2")
            p 매우 그렇다
         
      b-form-group(class="mb-5")
        h5 미세먼지로 인한 건강 정보가 제시됩니다. 제시된 건강정보를 가장 올바르게 설명한 것은 어느 것이라고 생각하십니까?
        label.mb-3 질병관리본부에 따르면, 미세먼지(PM2.5) 농도가 10㎍/㎥ 증가할 때마다 폐암 발생률이 9% 증가하는 것으로 나타났다. 보기 중 올바른 설명은 무엇입니까?
        b-form-radio-group(id="rightExplain" v-model="form.rightExplain" :options="formOptions.rightExplain" name="rightExplain"  stacked)
        
      b-form-group(class="mb-5")
        h5 1%는 1,000번 중 몇 번입니까?
        b-form-input(id="test1"
                        type="number"
                        v-model="form.test1"
                        aria-describedby="test1"
                        
                        placeholder="숫자")

      b-form-group(class="mb-5")
        h5 1,000번 중 1번은 몇 %입니까?
        b-form-input(id="test2"
                        type="number"
                        v-model="form.test2"
                        step="any"
                        aria-describedby="test2"
                        
                        placeholder="숫자")

      b-form-group(class="mb-5")
        h5 동전을 1,000번 던지면 앞면이 몇 번쯤 나오겠습니까? 
        b-form-input(id="test3"
                        type="number"
                        v-model="form.test3"
                        aria-describedby="test3"
                        
                        placeholder="숫자")
      .text-center
        b-button(type="submit" variant="primary") 제출하기

    //- step-progress(:currentStep=1)
    //- br
    //- b-form(@submit="onSubmit")
    //-   b-form-group(class="mb-5")
    //-     h5 올해 만 나이는 몇 세입니까?
    //-     b-form-input(id="age"
    //-                     type="number"
    //-                     v-model="form.age"
    //-                     aria-describedby="ageHelp"
    //-                     required
    //-                     :state="ageUnderLimit"
    //-                     placeholder="나이(숫자)")
    //-     //- b-form-invalid-feedback 최소 15세 이상으로 입력해주세요.
    //-     b-form-text(id="ageHelp") 숫자만 입력해주세요.
      
    //-   b-form-group(class="mb-5")
    //-     h5 성별은 무엇입니까?
    //-     b-form-radio-group(id="gender" v-model="form.gender" :options="formOptions.gender" name="gender" required stacked)
       
    //-   b-form-group(class="mb-5")
    //-     h5 현재 소속 대학/대학원은 어느 곳입니까?
    //-     b-form-select(id="belong" v-model="form.belong" :options="formOptions.belong" required)

    //-   b-form-group(class="mb-5")
    //-     h5 혼인 상태는 어떻게 되십니까?
    //-     b-form-radio-group(id="marriage" v-model="form.marriage" :options="formOptions.marriage" name="marriage" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 가정에 미취학 자녀(만 6세 이하)가 있습니까?
    //-     b-form-radio-group(id="kid" v-model="form.kid" :options="formOptions.kid" name="kid" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 평소 귀하의 건강상태는 어떠합니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 매우 나쁘다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.health"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //- )
    //-         b-form-radio-group(v-model="form.health" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 좋다
        
    //-   b-form-group(class="mb-5")
    //-     h5 현재 건강상의 문제나 신체 혹은 정신적 장애로 일상생활 및 사회활동에 제한을 받고 계십니까?
    //-     b-form-radio-group(id="handicap" v-model="form.handicap" :options="formOptions.boolean" name="handicap" required stacked)

    //-   b-form-group(class="mb-5" v-if="form.handicap == '예'")
    //-     h5 일상 활동에 제한을 가져온 이유는 무엇입니까?
    //-     b-form-checkbox-group(v-model="form.handicapReason" name="handicapReason" id="handicapReason" :options="formOptions.handicapReason" stacked)
    //-     b-form-input(
    //-                   v-if="form.handicapReason && form.handicapReason.includes('기타')"
    //-                   type="text"
    //-                   v-model="form.handicapReasonETC"
    //-                   id="handicapReasonETC"
    //-                   required
    //-                   placeholder="일상 활동에 제한을 가져온 질환을 적어주세요.")

      
    //-   b-form-group(class="mb-5")
    //-     h5 최근 2주 동안 입원을 하지않고, 병의원(치과 포함)이나 보건소, 한의원에서 치료를 받은 적이 있습니까?
    //-     b-form-radio-group(id="health2weaksAgo" v-model="form.health2weaksAgo" :options="formOptions.boolean" name="health2weaksAgo" required stacked)
      
    //-   b-form-group(class="mb-5" v-if="form.health2weaksAgo == '예'")
    //-     h5 최근 2주 동안 입원을 하지 않고, 병의원(치과 포함)이나 보건소, 한의원에서 치료를 몇 번 받았습니까?
    //-     b-form-input(id="health2weaksAgoNumber"
    //-                     type="number"
    //-                     v-model="form.health2weaksAgoNumber"
    //-                     aria-describedby="health2weaksAgoNumber"
    //-                     required
    //-                     placeholder="횟수")
    //-     b-form-text(id="health2weaksAgoNumber") 숫자만 입력해주세요.
      
    //-   //- 문10
    //-   b-form-group(class="mb-5")
    //-     h5 현재 담배를 피우고 계십니까?
    //-     b-form-radio-group(id="cigar" v-model="form.cigar" :options="formOptions.cigar" name="cigar" required stacked)
      
    //-   //- 문10-1
    //-   b-form-group(class="mb-5" v-if="form.cigar == '현재 매일 피움'")
    //-     h5 하루평균 흡연량은 몇 개비나 됩니까?
    //-     b-form-input(id="cigarOneDay"
    //-                     type="number"
    //-                     v-model="form.cigarOneDay"
    //-                     aria-describedby="cigarOneDay"
    //-                     required
    //-                     placeholder="개비수")
    //-     b-form-text(id="cigarOneDay") 숫자만 입력해주세요.
      
    //-   //- 문10-2
    //-   b-form-group(class="mb-5" v-if="form.cigar == '가끔 피움'")
    //-     h5 최근 1개월간 흡연 일수는 몇일입니까?
    //-     b-form-input(id="cigarOneMonth"
    //-                     type="number"
    //-                     v-model="form.cigarOneMonth"
    //-                     aria-describedby="cigarOneMonth"
    //-                     required
    //-                     :state="checkCigarOneMonth"
    //-                     placeholder="일수")
    //-     b-form-invalid-feedback 31일 이하의 수만 적어주세요.
    //-     b-form-text(id="cigarOneMonthText") 숫자만 입력해주세요.

    //-   //- 문10-3
    //-   b-form-group(class="mb-5" v-if="form.cigar == '과거에는 피웠으나 현재 피우지 않음(앞으로도 계속 금연)'")
    //-     h5 흡연 중단 시기는 언제입니까?
    //-     b-form-input(id="cigarStopDay"
    //-                     type="date"
    //-                     v-model="form.cigarStopDay"
    //-                     aria-describedby="cigarStopDay"
    //-                     required
    //-                     :state="cigarStopDayYear"
    //-                     placeholder="개수")
    //-     b-form-invalid-feedback 1950년 이후로 설정해주세요.
    //-     b-form-text(id="cigarStopDayHelp") 숫자만 입력해주세요.
        
    //-   //- 문11
    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 일반적으로 위험을 피하기보다는 위험을 감수하는 편입니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 그렇지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.challenge"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //- )
    //-         b-form-radio-group(v-model="form.challenge" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 그렇다

    //-   b-form-group(class="mb-5")
    //-     h5 급하게 이동 중인 상황에서 교차로를 건널 때, 신호등의 신호가 바뀌기 직전이라면 귀하는 멈추지 않고 지나가는 편입니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 그렇지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.challengeNonStop"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //- )
    //-         b-form-radio-group(v-model="form.challengeNonStop" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 그렇다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 알코올이 건강에 다소 나쁜 영향을 미친다고 할지라도 기분 전환, 친목 유지, 사회생활 등 음주로 인한 이익을 추구하시겠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 그렇지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.alcohol"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //- )
    //-         b-form-radio-group(v-model="form.alcohol" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 그렇다
      
    //-   b-form-group(class="mb-5")
    //-     h5 향후 5년 이내, 다음의 각 항목으로 인한 위험이 발생할 가능성은 어느 정도라고 생각하십니까?
    //-     br
    //-     p.mb-1.text-center 신종감염병 (예: 메르스)	
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 높지 않다	
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.mersc"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.mersc" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 높다

    //-     p.mb-1.text-center 방사능 누출(예: 원전 사고)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 높지 않다	
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.radiation"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.radiation" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 높다

    //-     p.mb-1.text-center 자연재해(예: 포항지진)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 높지 않다	
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.nd"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.nd" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 높다

    //-     p.mb-1.text-center 사회적 재난(예: 세월호 참사)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 높지 않다	
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.sd"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.sd" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 높다

    //-     p.mb-1.text-center 생활화학제품 안전사고(예: 가습기살균제 사건)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 높지 않다	
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.pd"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.pd" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 높다

    //-     p.mb-1.text-center 환경화학물질 노출(예: 미세먼지로 인한 건강문제)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 높지 않다	
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.cd"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.cd" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 높다

    //-   b-form-group(class="mb-5")
    //-     h5 위의 위험이 발생하였을 때, 그 심각성은 각각 어느 정도일 것이라고 생각하십니까?
    //-     br
    //-     p.mb-1.text-center 신종감염병 (예: 메르스)	
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 심각하지 않다	
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.merscDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.merscDeep" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 심각하다

    //-     p.mb-1.text-center 방사능 누출(예: 원전 사고)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 심각하지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.radiationDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.radiationDeep" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 심각하다

    //-     p.mb-1.text-center 자연재해(예: 포항지진)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 심각하지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.ndDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.ndDeep" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 심각하다

    //-     p.mb-1.text-center 사회적 재난(예: 세월호 참사)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 심각하지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.sdDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.sdDeep" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 심각하다

    //-     p.mb-1.text-center 생활화학제품 안전사고(예: 가습기살균제 사건)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 심각하지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.pdDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.pdDeep" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 심각하다

    //-     p.mb-1.text-center 환경화학물질 노출(예: 미세먼지로 인한 건강문제)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 심각하지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.cdDeep"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.cdDeep" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 심각하다

      
    //-   b-form-group(class="mb-5")
    //-     h5 가장 선호하는 정보 유형은 어떤 것입니까? 
    //-     b-form-radio-group(id="infoType" v-model="form.infoType" :options="formOptions.infoType" name="infoType" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 가장 선호하는 정보 제공 방식은 어떤 것입니까?
    //-     b-form-radio-group(id="preferInfoType" v-model="form.preferInfoType" :options="formOptions.preferInfoType" name="preferInfoType" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 맞춤형 정보를 어떻게 생각하십니까? (예: 페이스북 광고, 유튜브 추천 영상, 음악 어플의 추천 음악 등)
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 매우 부정적이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.customInfo"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.customInfo" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 긍정적이다

    //-   b-form-group(class="mb-5")
    //-     h5 건강정보 관련 맞춤형 정보를 어떻게 생각하십니까? (예: 개인 맞춤형 운동 처방, 맞춤형 보건교육 등) 
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 매우 부정적이다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.customHealthInfo"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.customHealthInfo" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 긍정적이다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 다음의 설명에 동의하십니까? 각 항목에 대해 귀하의 생각과 가장 가까운 답을 선택해주십시오 
    //-     p.semiTitle.mb-1.text-center 나는 ‘과학 전문용어’로 이루어진 건강 정보를 이해하는 것이 어렵다
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 아니다, 쉽게 이해할 수 있다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.understandExpert"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.understandExpert" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 그렇다, 이해하기 어렵다

    //-     p.semiTitle.mb-1.text-center 나는 ‘숫자’로 이루어진 건강 정보를 이해하는 것이 어렵다
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 아니다, 쉽게 이해할 수 있다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.understandNumber"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.understandNumber" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 그렇다, 이해하기 어렵다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 건강 정보를 주로 어디에서 접하십니까? 가장 많이 접하는 종류 한 가지만 선택해주십시오
    //-     b-form-radio-group(v-model="form.infoSource" name="infoSource" :options="formOptions.infoSource" required stacked)
    //-     b-form-input(
    //-                   v-if="form.infoSource && form.infoSource.includes('기타')"
    //-                   type="text"
    //-                   v-model="form.infoSourceETC"
    //-                   required
    //-                   placeholder="매체명을 적어주세요.")

    //-   b-form-group(class="mb-5")
    //-     h5 귀하와 비슷한 나이대의 사람들과 비교하였을 때, 향후 5년 이내 귀하가 미세먼지로 인해 입을 건강 피해는 어느 정도라고 생각하십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 없다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.compareHealth"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.compareHealth" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 심각하다

    //-   b-form-group(class="mb-5")
    //-     h5 미세먼지로 인한 건강 피해에 대해 알고 계십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 모른다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.dustDamage"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.dustDamage" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 잘 알고있다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 2017년 9월 정부가 발표한 ‘미세먼지 관리 종합대책’에 대해 얼마나 알고 계십니까? 
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 모른다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.dust2017Gov"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.dust2017Gov" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 잘 알고있다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 환경부에서 발표한 ‘미세먼지 국민행동요령’에 대해 얼마나 알고 계십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 모른다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.dustReact"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.dustReact" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 잘 알고있다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 2005년 12월부터 환경부에서 제공 중인 전국 실시간 대기 오염도 공개 홈페이지 ‘에어코리아’에 대해 알고 계십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 모른다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.airKorea"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.airKorea" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 잘 알고있다

    //-   b-form-group(class="mb-5")
    //-     h5 미세먼지 위험으로 인한 문제 해결의 책임은 누구에게 있다고 생각하십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 개인
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.obl"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.obl" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 국가

    //-   b-form-group(class="mb-5")
    //-     h5 미세먼지 관련 정보를 얼마나 자주 찾아보십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 찾아보지 않는다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.oftenSearch"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.oftenSearch" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매일 찾아본다

    //-   b-form-group(class="mb-5")
    //-     h5 아래 ‘미세먼지 국민행동요령’ 중 가장 많이 실천하는 행동은 무엇입니까?
    //-     b-form-radio-group(id="realAction" v-model="form.realAction" :options="formOptions.realAction" name="realAction" required stacked)

    //-   b-form-group(class="mb-5")
    //-     h5 앞서 선택한 미세먼지 행동 요령을 얼마나 자주 실천하십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 일주일 중 하루 실천
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.howOftenAction"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.howOftenAction" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 일주일 중 5일 이상 실천

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 ‘미세먼지 국민행동요령’을 읽고 실천하는 것이 미세먼지로부터의 건강 위험을 막는 효과적인 방법이라고 생각하십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 효과적이지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.isThatEffect"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.isThatEffect" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 효과적이다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하가 접했던 미세먼지 관련 정보는 이해하기 쉬웠습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 매우 쉬웠다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.difficulty"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.difficulty" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 어려웠다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 정부가 제공한 미세먼지에 대한 정보를 얼마나 신뢰하십니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 믿지않는다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.trust"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.trust" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 완전히 믿는다

    //-   b-form-group(class="mb-5")
    //-     h5 귀하는 어떤 미세먼지 정보에 관심이 있습니까? 최대 두 가지만 선택해주십시오
    //-     b-form-checkbox-group(id="interest" v-model="form.interest" :options="formOptions.interest" name="interest" @input="interestCheckBox()" stacked)
    //-     b-form-input(
    //-                   v-if="form.interest && form.interest.includes('기타')"
    //-                   type="text"
    //-                   v-model="form.interestETC"
    //-                   required
    //-                   placeholder="관심 정보를 적어주세요")

    //-   b-form-group(class="mb-5" id="enough")
    //-     h5 귀하는 미세먼지에 대해 궁금했던 정보를 충분히 얻을 수 있었습니까?
    //-     b-row
    //-       b-col(cols="2")
    //-         p.text-right 전혀 그렇지 않다
    //-       b-col(cols="8")
    //-         //- vue-slider(
    //-         //-   v-model="form.enough"
    //-         //-   v-bind="formOptions.defaultForm"
    //-         //-   class="mb-5"
    //-         //- )
    //-         b-form-radio-group(v-model="form.enough" class="text-center" required)
    //-           b-row
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="1") 1
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="2") 2
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="3") 3
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="4") 4
    //-             b-col(cols="2" class="mr-auto ml-auto")
    //-               b-form-radio(value="5") 5
    //-       b-col(cols="2")
    //-         p 매우 그렇다
         
    //-   b-form-group(class="mb-5")
    //-     h5 미세먼지로 인한 건강 정보가 제시됩니다. 제시된 건강정보를 가장 올바르게 설명한 것은 어느 것이라고 생각하십니까?
    //-     label.mb-3 질병관리본부에 따르면, 미세먼지(PM2.5) 농도가 10㎍/㎥ 증가할 때마다 폐암 발생률이 9% 증가하는 것으로 나타났다. 보기 중 올바른 설명은 무엇입니까?
    //-     b-form-radio-group(id="rightExplain" v-model="form.rightExplain" :options="formOptions.rightExplain" name="rightExplain" required stacked)
        
    //-   b-form-group(class="mb-5")
    //-     h5 1%는 1,000번 중 몇 번입니까?
    //-     b-form-input(id="test1"
    //-                     type="number"
    //-                     v-model="form.test1"
    //-                     aria-describedby="test1"
    //-                     required
    //-                     placeholder="숫자")

    //-   b-form-group(class="mb-5")
    //-     h5 1,000번 중 1번은 몇 %입니까?
    //-     b-form-input(id="test2"
    //-                     type="number"
    //-                     v-model="form.test2"
    //-                     step="any"
    //-                     aria-describedby="test2"
    //-                     required
    //-                     placeholder="숫자")

    //-   b-form-group(class="mb-5")
    //-     h5 동전을 1,000번 던지면 앞면이 몇 번쯤 나오겠습니까? 
    //-     b-form-input(id="test3"
    //-                     type="number"
    //-                     v-model="form.test3"
    //-                     aria-describedby="test3"
    //-                     required
    //-                     placeholder="숫자")
    //-   .text-center
    //-     b-button(type="submit" variant="primary") 제출하기

</template>

<script>
// import vueSlider from 'vue-slider-component';

export default {
  components: {
    // vueSlider,
  },
  data() {
    return {
      formOptions: {
        gender: [
          { text: '남자', value: '남자' },
          { text: '여자', value: '여자' },
        ],
        belong: [
          {value: null, text: "학과를 선택해주세요"},
          {value: "인문대학", text: "인문대학"},
          {value: "사회과학대학", text: "사회과학대학"},
          {value: "자연과학대학", text: "자연과학대학"},
          {value: "경영대학", text: "경영대학"},
          {value: "공과대학", text: "공과대학"},
          {value: "농업생명과학대학", text: "농업생명과학대학"},
          {value: "미술대학", text: "미술대학"},
          {value: "사범대학", text: "사범대학"},
          {value: "생활과학대학", text: "생활과학대학"},
          {value: "수의과대학", text: "수의과대학"},
          {value: "약학대학", text: "약학대학"},
          {value: "음악대학", text: "음악대학"},
          {value: "자유전공학부", text: "자유전공학부"},
          {value: "치과대학", text: "치과대학"},
          {value: "보건대학원", text: "보건대학원"},
          {value: "행정대학원", text: "행정대학원"},
          {value: "환경대학원", text: "환경대학원"},
          {value: "국제대학원", text: "국제대학원"},
          {value: "경영전문대학원", text: "경영전문대학원"},
          {value: "법학전문대학원", text: "법학전문대학원"},
          {value: "융합과학기술대학원", text: "융합과학기술대학원"},
          {value: "간호대학", text: "간호대학"},
          {value: "의과대학", text: "의과대학"},
          {value: "치의학대학원", text: "치의학대학원"},
          {value: "의학대학원", text: "의학대학원"},
          {value: "국제농업기술대학원", text: "국제농업기술대학원"},
        ],
        marriage: [
          { text: '미혼', value: '미혼' },
          { text: '기혼(사실혼 포함)', value: '기혼(사실혼 포함)' },
          { text: '사별', value: '사별' },
          { text: '이혼', value: '이혼' },
          { text: '별거', value: '별거' },
        ],
        kid: [
          { text: '예', value: '예' },
          { text: '아니오, 취학 자녀만 있습니다', value: '아니오, 취학 자녀만 있습니다' },
          { text: '아니오, 자녀가 없습니다', value: '아니오, 자녀가 없습니다' },
        ],
        boolean: [
          { text: '예', value: '예' },
          { text: '아니오', value: '아니오' },
        ],
        handicapReason: [
          {text: "골절, 관절부상", value: "골절, 관절부상"},
          {text: "기타 손상", value: "기타 손상"},
          {text: "관절염, 류마티즘", value: "관절염, 류마티즘"},
          {text: "심장질환", value: "심장질환"},
          {text: "호흡문제, 폐질환, 천식", value: "호흡문제, 폐질환, 천식"},
          {text: "뇌졸중", value: "뇌졸중"},
          {text: "당뇨병", value: "당뇨병"},
          {text: "고혈압", value: "고혈압"},
          {text: "등, 목의 문제", value: "등, 목의 문제"},
          {text: "암", value: "암"},
          {text: "치아 및 구강질환", value: "치아 및 구강질환"},
          {text: "시력문제", value: "시력문제"},
          {text: "청각문제", value: "청각문제"},
          {text: "치매", value: "치매"},
          {text: "우울/불안/정서상 문제", value: "우울/불안/정서상 문제"},
          {text: "정신지체", value: "정신지체"},
          {text: "비만", value: "비만"},
          {text: "노령", value: "노령"},
          {text: "신부전", value: "신부전"},
          {text: "어지럼증", value: "어지럼증"},
          {text: "위장장애", value: "위장장애"},
          {text: "무릎, 다리통증(관절염 제외)", value: "무릎, 다리통증(관절염 제외)"},
          {text: "두통", value: "두통"},
          {text: "기타", value: "기타"},
        ],
        cigar: [
          {text: "피운 적 없음", value: "피운 적 없음"},
          {text: "현재 매일 피움", value: "현재 매일 피움"},
          {text: "가끔 피움", value: "가끔 피움"},
          {text: "과거에는 피웠으나 현재 피우지 않음(앞으로도 계속 금연)", value: "과거에는 피웠으나 현재 피우지 않음(앞으로도 계속 금연)"},
        ],
        infoType: [
          { text: '텍스트 형태', value: '텍스트 형태' },
          { text: '시각화 형태', value: '시각화 형태' },
          { text: '텍스트와 시각화 혼합 형태', value: '텍스트와 시각화 혼합 형태' },
        ],
        preferInfoType: [
          { text: '텍스트 형태', value: '텍스트 형태' },
          { text: '시각화 형태', value: '시각화 형태' },
          { text: '텍스트와 시각화 혼합 형태', value: '텍스트와 시각화 혼합 형태' },
        ],
        infoSource: [
          {value: "방송매체(TV, 라디오 등)", text: "방송매체(TV, 라디오 등)"},
          {value: "인쇄매체(신문, 잡지 등)", text: "인쇄매체(신문, 잡지 등)"},
          {value: "인터넷 포털사이트(다음, 네이버, 구글 등)", text: "인터넷 포털사이트(다음, 네이버, 구글 등)"},
          {value: "개인 블로그나 SNS(트위터, 페이스북 등)", text: "개인 블로그나 SNS(트위터, 페이스북 등)"},
          {value: "가족, 친구 등 지인", text: "가족, 친구 등 지인"},
          {value: "유튜브", text: "유튜브"},
          {value: "없음", text: "없음"},
          {value: "기타", text: "기타"},
        ],
        defaultForm: {
          value: null,
          width: "100%",
          tooltip: "hover",
          disabled: false,
          piecewise: true,
          piecewiseLabel: true,
          style: {
            "marginLeft": "0%"
          },
          data: [
            1,
            2,
            3,
            4,
            5
          ],
          processStyle: {
            "backgroundColor": "#ccc",
          },
          piecewiseStyle: {
            "backgroundColor": "#ccc",
            "visibility": "visible",
            "width": "12px",
            "height": "12px"
          },
          tooltipDir: "bottom",
        },
        realAction: [
          {value: "외출 자제", text: "외출 자제"},
          {value: "보건용 마스크 착용", text: "보건용 마스크 착용"},
          {value: "외출 후 깨끗이 씻기", text: "외출 후 깨끗이 씻기"},
          {value: "대기오염 유발행위 자제", text: "대기오염 유발행위 자제"},
          {value: "대기오염 심한 곳 피하고 활동량 줄이기", text: "대기오염 심한 곳 피하고 활동량 줄이기"},
          {value: "환기, 실내 물청소 등 실내 공기질 관리", text: "환기, 실내 물청소 등 실내 공기질 관리"},
          {value: "물과 비타민 C가 풍부한 과일이나 야채 섭취", text: "물과 비타민 C가 풍부한 과일이나 야채 섭취"},
        ],
        interest: [
          {value: "구성성분", text: "구성성분"},
          {value: "건강영향", text: "건강영향"},
          {value: "주요 배출원", text: "주요 배출원"},
          {value: "국민행동요령", text: "국민행동요령"},
          {value: "관심 지역 농도", text: "관심 지역 농도"},
          {value: "기타", text: "기타"},
        ],
        rightExplain: [
          {value: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 증가하면 내가 살고있는 지역의 새로 폐암 발생자가 100명당 9명이 더 생긴다", text: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 증가하면 내가 살고있는 지역의 새로 폐암 발생자가 100명당 9명이 더 생긴다"},
          {value: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 증가하면 내가 폐암에 걸릴 확률이 9% 늘어난다", text: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 증가하면 내가 폐암에 걸릴 확률이 9% 늘어난다"},
          {value: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 감소하면 폐암 사망자 100명당 9명 줄일 수 있다", text: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 감소하면 폐암 사망자 100명당 9명 줄일 수 있다"},
          {value: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 감소하면 내가 폐암에 걸릴 확률이 9% 줄어든다", text: "내가 살고있는 지역에 미세먼지(PM2.5) 농도가 10㎍/㎥ 감소하면 내가 폐암에 걸릴 확률이 9% 줄어든다"},
        ]
      },
      formComplete: false,
      screenHeight: 0,
      form: {
        age: null,
        gender: null,
        belong: null,
        marriage: null,
        kid: null,
        health: null,
        handicap: null,
        handicapReason: [],
        handicapReasonETC: null,
        health2weaksAgo: null,
        health2weaksAgoNumber: null,
        cigar: null,
        cigarOneDay: null,
        cigarOneMonth: null,
        cigarStopDay: null,
        challenge: null,
        challengeNonStop: null,
        alcohol: null,
        mersc: null,
        radiation: null,
        nd: null,
        sd: null,
        pd: null,
        cd: null,
        merscDeep: null,
        radiationDeep: null,
        ndDeep: null,
        sdDeep: null,
        pdDeep: null,
        cdDeep: null,
        infoType: null,
        preferInfoType: null,
        customInfo: null,
        customHealthInfo: null,
        understandExpert: null,
        understandNumber: null,
        infoSource: null,
        infoSourceETC: null,
        compareHealth: null,
        dustDamage: null,
        dust2017Gov: null, 
        dustReact: null,
        airKorea: null,
        obl: null,
        oftenSearch: null,
        realAction: null,
        howOftenAction: null,
        isThatEffect: null,
        difficulty: null,
        trust: null,
        interest: [],
        interestETC: null,
        enough: null,
        rightExplain: null,
        test1: null,
        test2: null,
        test3: null,
      },
    }
  },
  mounted() {
    setTimeout(()=>{
      this.setFormComplete()
    }, 5000);
    this.screenHeight = window.innerHeight;
  },
  computed: {
    checkCigarOneMonth() {
      return this.form.cigarOneMonth <= 31 ? true : false
    },
    ageUnderLimit() {
      if(!this.form.age) return true
      return this.form.age >= 15  && this.form.age <= 100 ? true : false
    },
    cigarStopDayYear() {
      if(!this.form.cigarStopDay) return true
      return Number(this.form.cigarStopDay.split("-")[0]) >= 1950 ? true : false
    },
  },
  methods: {
    interestCheckBox(s) {
      if(this.form.interest.length > 2) {
        this.form.interest.pop();
        this.$toasted.error("최대 2개 입니다.")
        return false
      }
    },
    move() {
      const that = this;
      this.$alertify.confirmWithTitle("경고창", "이 페이지에서 50여개의 문항까지 설문을 완료하셔야 합니다. 완료하셨습니까?",
        function(){
          that.$router.push('/survey/location_select')
        },
        function(){
          that.$toasted.show("설문을 완료해주세요.")
        }
      )
    },
    setFormComplete() {
      this.formComplete = true
    },
    onSubmit(evt) {
      evt.preventDefault();

      // // 올해 만 나이는 몇 세입니까? - 나이 15세 이상만
      // if(this.form.age && this.form.age < 15) {
      //   document.getElementById("age").scrollIntoView();
      //   return false
      //   // return this.$toasted.error("15세 이상으로 입력해주세요.")
      // }

      // // 최근 1개월간 흡연 일수는 몇일입니까? 문항 validate
      // if(this.form.cigarOneMonth && this.form.cigarOneMonth > 31) {
      //   document.getElementById("cigarOneMonth").scrollIntoView();
      //   return this.$toasted.error("'최근 1개월간 흡연 일수는 몇일입니까?' 문항을 확인해주세요.")
      // }

      // // 흡연 중단 시기는 언제입니까? - 1950년 이후
      // if(this.form.cigarStopDay && Number(this.form.cigarStopDay.split("-")[0]) < 1950) {
      //   document.getElementById("cigarStopDay").scrollIntoView();
      //   return this.$toasted.error("1950년 이후로 설정해주세요.");
      // }

      // this.axios
      //   .post("/login/question", {form: this.form, email: this.$store.getters.getEmail})
      //   .then(res => {
      //     if(!res.data.success) return this.$toasted.error(res.data.message)
      //     return this.$router.push("/survey/location_select")
      //   })
      //   .catch(err => {
      //     console.log('err : ', err)
      //   })

      this.$router.push("/survey/location_select")
    }
  }
}
</script>
