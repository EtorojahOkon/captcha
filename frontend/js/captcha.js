//initializations
var trials = 0;

//methods
initializeCaptcha = (url,  length = 5, callback = false, reload=false) => {
    if (length < 4 || length > 8) {
        length = 5
    }
    
    if (reload === false) {
        //load up captcha
        var a = document.createElement("center")
        a.id = "captcha-div"
        var b = document.createElement("div")
        b.className = "captcha-popup"
        var title = document.createElement("h5");
        title.className = "captcha-title"
        title.innerHTML = "Captcha"
        var c = document.createElement("span")
        c.className = "pd-top"
        c.id = "captcha-loading"
        c.innerHTML = "Loading..."
        var d = document.createElement("div")
        var canvas = document.createElement("canvas")
        canvas.id = "captcha-main"
        canvas.className = "captcha-canvas"
        canvas.height = "40"
        d.className = "captcha-pad"
        var e = document.createElement("input")
        e.className = "captcha-input"
        e.type = "text"
        e.id = "captcha-input"
        e.placeholder = "Enter Captcha text here..."
        d.appendChild(e)
        var f = document.createElement("div")
        f.className = "captcha-pad"
        var g = document.createElement("span")
        var submit = document.createElement("button")
        submit.innerHTML = "Submit"
        submit.addEventListener("click", function(){
            verifyCaptcha(url, length,callback)
        })
        var cancel = document.createElement("button")
        cancel.innerHTML = "Cancel"
        cancel.addEventListener("click", exitCaptcha)
        submit.className = "captcha-btn submit"
        cancel.className = "captcha-btn cancel"
        g.appendChild(submit)
        g.appendChild(cancel)
        f.appendChild(g)
        b.appendChild(title)
        b.appendChild(canvas)
        b.appendChild(c)
        b.appendChild(d)
        b.appendChild(f)
        a.appendChild(b)
        document.body.appendChild(a)
        document.getElementById("captcha-main").style.display = "none"
    }
    
    //get captcha request
    var xhttp = new XMLHttpRequest();
    if (XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const resp = JSON.parse(this.responseText)
            document.getElementById("captcha-loading").style.display = "none"
            var c = document.getElementById("captcha-main")
            var ctx = c.getContext("2d")
            ctx.clearRect(0,0, c.width, c.height)
            ctx.font = "20px Arial"
            ctx.fillStyle = "lightslategray"
            ctx.strokeText(resp.message, c.width/2.5, c.height/1.5)
            c.style.display = "block"
        }
    }
    xhttp.open("GET", url + "?get_captcha=true&length=" + length, true);
	xhttp.send();
}

verifyCaptcha = (url, length,callback) => {
    if (trials < 5) {
        var captcha = document.getElementById("captcha-input").value
        var xhttp = new XMLHttpRequest();
        var formdata = new FormData()
        formdata.append("verfy_captcha", "true")
        formdata.append("submission", captcha)
        if (XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        }
        else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                trials = trials+ 1
                const resp = JSON.parse(this.responseText)

                if (resp.status == "success") {

                    if (callback == false){
                        showMessage(resp.message, "success")
                    } 
                    else{
                        showMessage(resp.message, "success")
                        exitCaptcha()
                        callback.call()
                    }
                    
                }
                else{
                    showMessage(resp.message, "error")
                    document.getElementById("captcha-input").setAttribute("disabled", true)
                    setTimeout(() => {
                        document.getElementById("captcha-input").removeAttribute("disabled")
                        initializeCaptcha(url, length, callback, true)
                    }, 3000);
                }
                
            }
        }
        xhttp.open("POST", url, true);
	    xhttp.send(formdata);
    }
    else{
        showMessage("Please try again after 20 secs.", "error")
        setTimeout(() => {
            trials = 0
        }, 20000);
    }
}

showMessage = (message, type) => {
    document.getElementById("captcha-loading").style.color = (type === "error") ? "red" : "green"
    document.getElementById("captcha-loading").innerHTML = message
    document.getElementById("captcha-loading").style.display = "block"
    setTimeout(() => {
        document.getElementById("captcha-loading").style.display = "none"
    }, 5000);
}

exitCaptcha = () => {
    document.getElementById("captcha-div").remove()
}



