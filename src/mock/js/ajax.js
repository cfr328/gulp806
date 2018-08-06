function ajax(url, ck) {
    var xml = window.XMLHttpRequest?new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xml.onload = function () {
        if (xml.status === 200 || xml.status === 304) {
            ck(JSON.parse(xml.responseText))
        }
    }
    xml.open('get', url, true);
    xml.send(null);
}