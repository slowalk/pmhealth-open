exports.adrrTranslate = (r) => {
  if (r === "RR") {
    return "위험도"
  } else if (r === "ad") {
    return "초과 사망자수"
  }
}

exports.addUnitToAirPol = (a) => {
  if (a == "PM2_5") {
    return "㎍/㎥";
  } else if (a == "PM10") {
    return "㎍/㎥";
  } else if (a == "NO2") {
    return "ppm";
  } else {
    return "";
  }
}

function getSearchQueryParam(param) {
  var result = window.location.search.match(
    new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
  );

  return result ? result[3] : false;
}
exports.getSearchQueryParam = getSearchQueryParam;

// url control
exports.changeLocationSearchParams = (k, v) => {
  if (getSearchQueryParam(k) == false) {
    history.pushState(null, null, window.location.href + (window.location.search == "" ? "?" : "&") + k + "=" + v);
  } else if (getSearchQueryParam(k)) {

    var anotherTopic = (k == "airpol" ? "adrr" : "airpol");

    if (k == "sd") {
      history.pushState(null, null, window.location.origin + window.location.pathname +
        "?sd=" + v
      );
    } else if (k == "sd" || k == "sgg") {
      history.pushState(null, null, window.location.origin + window.location.pathname +
        "?sd=" + getSearchQueryParam("sd") +
        "&sgg=" + v
      );
    } else {
      history.pushState(null, null, window.location.origin + window.location.pathname +
        "?sd=" + getSearchQueryParam("sd") +
        "&sgg=" + getSearchQueryParam("sgg") +
        ("&" + k + "=" + v) +
        (getSearchQueryParam(anotherTopic) == "" ? "" : "&" + anotherTopic + "=" + getSearchQueryParam(anotherTopic))
      );
    }
  }
}

exports.getUrlVars = () => {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
  function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

exports.changeBarGraphTitle = (e) => {
  if (e == "RR") {
      barGraphTitle.text("지역별 상대 위험도")
  } else {
      barGraphTitle.text("지역별 초과 사망자수")
  }
}