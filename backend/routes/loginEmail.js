const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const moment = require("moment")

const codeToSD = {
  "11": "서울특별시",
  "21": "부산광역시",
  "22": "대구광역시",
  "23": "인천광역시",
  "24": "광주광역시",
  "25": "대전광역시",
  "26": "울산광역시",
  "29": "세종특별자치시",
  "31": "경기도",
  "32": "강원도",
  "33": "충청북도",
  "34": "충청남도",
  "35": "전라북도",
  "36": "전라남도",
  "37": "경상북도",
  "38": "경상남도",
  "39": "제주특별자치도"
}

const mailConfig = {
  mailer: {
    // service: 'Gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // user: 'dave@slowalk.co.kr',
    // password: 'aksehd12',

    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    user: 'pmhealth2018@gmail.com',
    password: 'aksehd12',
  },
};

const surveyExplain = '<div class="explainWrapper"><br><h3>지도 시각화한 건강 정보의 효과성 평가 및 미세먼지 건강영향 위험 문해력 평가:텍스트와 시각화 비교</h3><br><p>연구참여자용 설명서 및 동의서</p><br><p>연구 과제명 : 지도 시각화한 건강 정보의 효과성 평가 및 미세먼지 건강영향 위험 문해력 평가:텍스트와 시각화 비교</p><p>연구 책임자명 : 정소화 (서울대학교 보건대학원, 석사 과정)</p><br><p>이 연구는 과학기술정보통신부에서 지원하는 미세먼지 국가전략프로젝트 세부 사업 ‘우리나라 미세 먼지 등 대기오염 건강영향 연구 및 건강영향 지도 구축(연구책임자: 서울대학교 보건대학원 황승식 교수)’의 일환입니다. 본 연구는 ‘지도 시각화한 건강 정보의 효과성 평가 및 미세먼지 건강영향 위험 문해력 평가:텍스트와 시각화 비교’에 대한 연구입니다. 지도 시각화한 건강 정보의 효과성과 미세먼 지 건강영향 위험 문해력을 알아보기 위해 수행하고자 합니다. 귀하는 본 연구에서 선정한 기준에 따 라 연구참여자로 적절하다고 판단되어 이 연구에 참여하도록 권유 받았습니다. 이 연구는 자발적으로 참여 의사를 밝히신 분에 한하여 수행 될 것이며, 귀하께서는 참여 의사를 결정하기 전에 본 연구가 왜 수행되는지 그리고 연구의 내용이 무엇과 관련 있는지 이해하는 것이 중요합니다. 다음 내용을 신 중히 읽어보신 후 참여 의사를 밝혀 주시길 바라며, 필요하다면 가족이나 친구들과 의논해 보십시오. 만일 어떠한 질문이 있다면 이 연구를 수행하는 서울대학교 보건대학원 소속의 담당 연구원 정소화 연구원(02-880- 2827)에게 문의시 귀하에게 이 연구에 대해 설명해 줄 것입니다.</p><br><br><p>1. 이 연구는 왜 실시합니까?</p><p>본 연구의 목적은 미세먼지의 위험도를 효과적으로 시각화하고 시각화 효과 크기를 아는 데에 있 습니다. 이 연구를 바탕으로 효과적인 위험정보소통을 위한 위험정보 시각화 방법을 고안할 수 있습니다.</p><br><p>2. 얼마나 많은 사람이 참여합니까?</p><p>서울대학교 내 재학생 165명이 참여 할 것입니다.</p><br><p>3. 만일 연구에 참여하면 어떤 과정이 진행됩니까?</p><p>만일 귀하가 참여의사를 밝혀주시면 다음과 같은 과정이 진행될 것입니다. 연구 참여시, 온라인 상에서 PC 또는 모바일 기기를 이용한 1회의 인터넷 설문 조사가 이루어지기 전 귀하는 먼저 이 메일을 주소를 입력하시고 입력한 이메일을 통해 본 설문조사를 수행할 수 있는 링크를 받게됩니 다. 링크를 통해 접속 시 개인의 인구학적 특징 및 성향과 건강상태를 묻는 17문항, 위험인식 관 련 15문항, 선호하는 정보 유형과 제공 방식, 건강 정보에 대한 관심도 등에 대한 7문항, 미세먼 지 관련 14문항, 문해력 관련 4문항을 작성합니다. 그 후 제공된 미세먼지 정보 페이지를 보신 후 시각화된 건강정보 혹은 글로 작성된 건강정보에 대한 내용과 인지 정도, 동기부여 등에 대한 문 항을 포함한 설문 8문항을 작성합니다. 다음으로 5분 이내의 뮤직비디오를 본 후 건강 정보가 포 함된 미세먼지 관련 정보 페이지를 보신 후 앞과 같은 설문 10문항을 수행하게 됩니다.</p><p>귀하는 평균 15분, 최대 20분이 소요되는 온라인 설문 조사를 수행하게 될 것입니다.</p><br><p>4. 연구 참여 기간은 얼마나 됩니까?</p><p>설문조사 총 1회를 수행하며 평균 15분, 최대 20분이 소요될 것입니다.</p><br><p>5. 참여 도중 그만두어도 됩니까?</p><p>예, 귀하는 언제든지 어떠한 불이익 없이 참여 도중에 그만 둘 수 있습니다. 만일 귀하가 연구에 참여하는 것을 그만두고 싶다면 담당 연구원이나 연구 책임자에게 즉시 말씀해 주십시오. 또한 온라인 설문 작성 시 창을 닫으시면 이전에 작성된 내용은 수집되지 않습니다.</p><br><p>6. 부작용이나 위험요소는 없습니까?</p><p>몇몇 질문은 개인적인 요소를 물을 수도 있습니다. 이럴 경우 귀하는 언제든지 조사를 중단 할 수 있습니다. 만일 연구 참여 도중 발생할 수 있는 부작용이나 위험 요소에 대한 질문이 있으면 담당 연구원에게 즉시 문의해 주십시오.</p><br><p>7. 이 연구에 참여시 참여자에게 이득이 있습니까?</p><p>귀하가 이 연구에 참여하는데 있어서 직접적인 이득은 없습니다. 그러나 귀하가 제공하는 정보는 ‘효과적인 위험정보소통을 위한 위험정보 시각화와 시각화 효과성 평가’에 도움이 될 것입니다.</p><br><p>8. 만일 이 연구에 참여하지 않는다면 불이익이 있습니까?</p><p>귀하는 본 연구에 참여하지 않을 자유가 있습니다. 또한, 귀하가 본 연구에 참여하지 않아도 귀하 의 수업 또는 성적을 포함한 어떠한 불이익도 없습니다.</p><br><p>9. 연구에서 얻은 모든 개인 정보의 비밀은 보장됩니까?</p><p>개인정보관리책임자는 서울대학교의 정소화 석사과정 (02-880-2827) 입니다. 본 연구에서 수집되 는 개인정보는 귀하의 성별, 나이, E-mail주소입니다. 수집된 개인정보는 개인 식별, 중복참여 여부 와 학내 구성원 식별 및 상품 제공을 위해 수집됩니다. 수집된 개인 정보는 연구책임자에게만 접 근이 허락됩니다. 본 연구에서 얻어진 개인정보 및 연구결과는 코드화된 인식 번호를 부여하여 관리되며 E-mail 주소는 연구 종료 시점을 기준으로 1년 후 폐기됩니다. 수집된 설문지는 코드화 되어 외장하드에 저장 후 비관계자의 접근이 불가한 실험실에 보관될 것입니다. 동의서는 관련 법령에 따라 3년을 보관한 후 폐기할 예정이며, 연구자료의 경우는 서울대학교 연구윤리 지침에 따라 가능한 영구 보관할 예정입니다. 저희는 이 연구를 통해 얻은 모든 개인 정보의 비밀 보장 을 위해 최선을 다할 것입니다. 이 연구에서 얻어진 개인 정보가 학회지나 학회에 공개 될 때 귀 하의 이름과 다른 개인 정보는 사용되지 않을 것입니다. 그러나 만일 법이 요구하면 귀하의 개인정보 는 제공될 수도 있습니다. 또한 모니터 요원, 점검 요원, 생명윤리위원회는 연구참여자의 개인 정보에 대한 비밀 보장을 침해하지 않고 관련규정이 정하는 범위 안에서 본 연구의 실시 절차와 자료의 신뢰 성을 검증하기 위해 연구 결과를 직접 열람할 수 있습니다. 귀하가 본 동의서에 서명하는 것은, 이러 한 사항에 대하여 사전에 알고 있었으며 이를 허용한다는 동의로 간주될 것입니다.</p><br><p>10. 이 연구에 참가하면 댓가가 지급됩니까?</p><p>귀하의 연구 참여시 감사의 뜻으로 4000원 가량의 음료 기프티콘이 제공되며 추첨을 통해 5명에 게 1만원 문화 상품권 기프티콘을, 3명에게 3만원 문화 상품권 기프티콘을, 1명에게 5만원 문화 상품권 기프티콘이 증정됩니다.</p><br><p>11. 연구에 대한 문의는 어떻게 해야 됩니까?</p><p>본 연구에 대해 질문이 있거나 연구 중간에 문제가 생길 시 다음 연구 담당자에게 연락하십시오.</p><br><pre>이름: 정소화            전화번호: 02-880-2827</pre><p>만일 어느 때라도 연구참여자로서 귀하의 권리에 대한 질문이 있다면 다음의 서울대학교 생명윤리위원회에 연락하십시오.</p><br><pre>서울대학교 생명윤리위원회 (SNUIRB)      전화번호: 02-880-5153</pre><br><br></div>';

let transporter = nodemailer.createTransport(smtpPool({
  service: mailConfig.mailer.service,
  host: mailConfig.mailer.host,
  port: mailConfig.mailer.port,
  auth: {
    user: mailConfig.mailer.user,
    pass: mailConfig.mailer.password,
  },
  secureConnection: true
}));

router.post('/checkAccessToken', (req, res, next) => {
  if(!req.body.accessToken) return res.json({success: false, message: "accessToken이 없습니다."})
  if(!req.body.model) return res.json({success: false, message: "model이 없습니다."})
  let getAccessToken = req.body.accessToken,
      getModel = req.body.model;
  User.findOneAndUpdate({accessToken: getAccessToken, model: getModel}, {active: true}, {new: true}, (err, user) => {
    if (err) return next(err);
    if(!user) return res.json({success: false, message: "잘못된 접속경로입니다. 마지막 메일을 확인해주세요."});
    // if(user.end_at.length == 0) return res.json({success: true, finished: false, message: "정상로그인 되었습니다.", accessToken: getAccessToken, model: getModel, email: user.email});
    // if(user.end_at.length > 0) return res.json({success: true, finished: true, message: "이미 완료한 설문입니다."})
    if(user.end_at.length == 0) return res.json({success: true,  message: "정상로그인 되었습니다.", accessToken: getAccessToken, model: getModel, email: user.email});
    if(user.end_at.length > 0) return res.json({success: true,  message: "이미 완료한 설문입니다."})
    
    // 임시
    // return res.json({success: true, finished: false, accessToken: getAccessToken, model: getModel, email: user.email})
  })    
})

router.post('/start', (req, res, next) => {
  if(!req.body.accessToken) return res.json({success: false, message: "accessToken이 없습니다."})
  if(!req.body.model) return res.json({success: false, message: "model이 없습니다."})
  let getAccessToken = req.body.accessToken, 
      getModel = req.body.model, 
      currentTime = moment().format();
  User.findOneAndUpdate({accessToken: getAccessToken, model: getModel}, {"$push": {start_at: currentTime}}, {new: true}, (err, user) => {
    if (err) return next(err);
    if(!user) return res.json({success: false});
    return res.json({success: true});
  })    
})

router.put('/location_select', (req, res, next) => {
  if(!req.body.accessToken) return res.json({success: false, message: "accessToken이 없습니다."})
  if(!req.body.model) return res.json({success: false, message: "model이 없습니다."})
  let getAccessToken = req.body.accessToken, 
      getModel = req.body.model, 
      getSd = req.body.sd,
      getSdNm = codeToSD[req.body.sd];

  User.findOneAndUpdate({accessToken: getAccessToken, model: getModel}, {sd_cd: getSd, sd_nm: getSdNm}, (err, user) => {
    if (err) return next(err);
    if(!user) return res.json({success: false});
    return res.json({success: true});
  })    
})

// 설문 완료
router.post('/end', (req, res, next) => {
  let getAccessToken = req.body.accessToken, 
      getModel = req.body.model, 
      currentTime = moment().format();
  User.findOneAndUpdate({accessToken: getAccessToken, model: getModel}, {"$push": {end_at: currentTime}}, {new: true}, (err, user) => {
    if (err) return next(err);
    if(!user) return res.json({success: false});
    // return res.json({success: true, finished: true});
    return res.json({success: true});
  })    
})

// 제한 인원수 체크
router.get('/checkClosed', (req, res, next) => {
  User.find({end_at: {"$ne": []}}, (err, users) => {
    if(users.length <= 180) return res.json({finished: false})
    // else return res.json({finished: true})
    else return res.json({finished: false})
  });
})

// 메일 보내기
router.post('/', (req, res, next) => {
  let email = req.body.email;

  // const domain = "@" + config.domain
  // if(!email.includes("@")) email += domain
  // if(!email.includes(domain)) return res.json({status: false, message: "이메일 도메인이 " + domain + " 이 아닙니다."})

  User.findOne({email: email}, (err, user) => {
    if (err) return next(err);
    let salt = Math.random().toString(36).substr(2).toUpperCase();
    let accessToken = jwt.encode({email: email}, salt)
    let mailOptions = {
      from: 'sohwaj@snu.ac.kr',
      // from: 'dave@slowalk.co.kr',
      subject: '건강영향 효과성 평가',
    }    

    if(user) {
      // 메일을 다시 받는 유저
      User.findOneAndUpdate({email: email}, {salt, accessToken, sessionID: req.sessionID, active: false}, {new: true}, (e, u) => {
        if (e) return next(e);
        // 세션발급
        req.session.user = u._id;
        mailOptions.to= email;
        mailOptions.html = 
        '<h4>이 연구는 과학기술정보통신부에서 지원하는 미세먼지 국가전략프로젝트 세부 사업 ‘우리나라 미세먼지 등 대기오염 건강영향 연구 및 건강영향 지도 구축(연구책임자: 서울대학교 보건대학원 황승식 교수)’의 일환입니다.</h4>' + 
        '<a style="text-decoration: none;user-select: none;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;display: inline-block;font-weight: 400;text-align: center;white-space: nowrap;vertical-align: middle;color: #fff;background-color: #007bff;border-color: #007bff;" href="' + config.home_url + '/checkAccessToken?accessToken=' + u.accessToken + '&model=' + u.model + '">설문시작</a>' + 
        '<br><br><hr>' +
        surveyExplain

        transporter.sendMail(mailOptions, (err, res) => {
          if (err) console.log('failed... => ', err);
          if (res) console.log('succeed... => ', res);
          // transporter.close();
        });
        return res.json({
          // email: email,
          status: "already",
          user: u,
          message: "메일을 다시보냈습니다. 확인해주세요.",
        })
      });
    } else {
      // 처음 접근하는 유저
      User.count().exec((err, count) => {
        if (err) return next(err);
        let model = count % 3 + 1;
        User.create({email, salt, accessToken, sessionID: req.sessionID, model}, (e, u) => {
          // if (e) return next(e);
          // 세션발급
          req.session.user = u._id;
          mailOptions.to = email;
          mailOptions.html = 
            '<h4>이 연구는 과학기술정보통신부에서 지원하는 미세먼지 국가전략프로젝트 세부 사업 ‘우리나라 미세먼지 등 대기오염 건강영향 연구 및 건강영향 지도 구축(연구책임자: 서울대학교 보건대학원 황승식 교수)’의 일환입니다.</h4>' + 
            '<a style="text-decoration: none;user-select: none;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;display: inline-block;font-weight: 400;text-align: center;white-space: nowrap;vertical-align: middle;color: #fff;background-color: #007bff;border-color: #007bff;" href="' + config.home_url + '/checkAccessToken?accessToken=' + u.accessToken + '&model=' + u.model + '">설문시작</a>' + 
            '<br><br><hr>' +
            surveyExplain;
          transporter.sendMail(mailOptions, (err, res) => {
            if (err) console.log('failed... => ', err);
            if (res) console.log('succeed... => ', res);
            // transporter.close();
          });
          return res.json({
            status: "new",
            result: u
          });
        })
      })
    }
  });
});

router.post('/question', (req, res, next) => {
  User.findOneAndUpdate({email: req.body.email}, {...req.body.form}, {new: true}, (err, user) => {
    if (err) return res.json({success: false, message: err});
    return res.json({success: true})
  })
});

module.exports = router;
