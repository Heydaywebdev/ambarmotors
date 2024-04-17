export function getIframe(api_url) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <title></title>
</head>
<body>
<div id='ez_leads_trade-in'></div>
<script async type='application/javascript' src='${api_url}/appraisal.js'></script>
</body>
</html>`
}
