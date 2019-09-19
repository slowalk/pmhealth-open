# 미세먼지
## 스펙
- DB : Mongo 
- Backend : Node.js Express.js 
- Frontend : Vue.js 
- 배경지도 : Naver Map API 지도
- 차트 : billboard.js
- 그외에 : bootstrap-vue

## 파일구조
- backend : express & MongoDB 백엔드 서버
- frontend : vue.js 프론트 서버
    - index.html : Naver Map API 등록 script 태그 있음. - ncpClientId
    - src
        - /components
            - /MapOld.vue : 현재 지도 페이지로 수정하기 전의 지도페이지
            - /Surveys.vue, /surveys/ : 설문조사 페이지
            - /Info.vue, /info : 스태틱페이지들
            - /Sd.vue, /Sgg.vue : 과거에 만들었던 지도페이지 (현재 안씀)
- backup : mongodb에 넣을 초기 데이터
- mongo-seed : 클라이언트가 요청한 가공을 위해 수행한 스크립트 및 데이터 모음 menual.txt로 설명 달아놓음

## 서버 정보
- 테스트서버 : Dell 서버
    - 폴더 위치 : /home/dave/app/pmhealth-mevn
    - 테스트서버 (Dell서버) 접근 방법 및 : 빗버킷 프로젝트의 ssh.txt

## 배포 방식 : Docker + nginx
프론트 서버 : 배포서버에서 nginx가 frontend/dist의 index.html을 바라보게 하면됨. 따라서 프론트서버는 개발서버에서 npm run build한 내용을 푸시 후 배포서버에서 git pull 했을 때 바로 적용됨.
백엔드 서버 : docker-compose build 로 빌드해야 적용됨. 볼륨 설정했기 때문에 빌드 후 데이터 안날라감.

### 배포 명령어
docker-compose up --build -d

## 커스터마이징 시 유의 사항
- backend/config/index.js 에서 실배포 환경설정 수정.
- frontend/src/plugins/customAxios.js 파일의 "'Production URL'/v1"을 실배포할 URL주소 설정할 것.
- backend/app.js 에 allowedOrigins 변수에 수정할 url 등록

### 네이버 지도 API
dave 개인 계정의 콘솔에서 관리했음. 이관시 새로 만들어서 nspClientId 만 바꾸면 됨.
