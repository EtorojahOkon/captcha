### Captcha
A simple custom text-captcha implementation in Javascript and Php

### Installation
Clone this repository and extract to your project directory

### Usage
Reference the Captcha stylesheet and script files found in **frontend** directory.
- #### Stylesheet
```html
    <link rel="stylesheet" href="./path-to/frontend/css/captcha.css">
```
- #### Script file
```html
    <script src="./path-to/frontend/js/captcha.js"></script>
```

### Usage
To, use, simply call the **initializeCaptcha** method on form submission with the appropriate parameters

#### Parameters
- **url:**(required) String, path to backend captcha url file found in **backend** directory.
- **length:**(optional) Number, length of captcha string(minimum of 4 and maximum of 8), defaults to 5.
- **callback**(optional) Callback function to be executed on successful captcha validation.
Example
```javascript
        document.getElementById("form").addEventListener("submit", function(e) {
            e.preventDefault()
            initializeCaptcha("./backend/captcha.php", 6, submitForm);
        })

    submitForm = () => {
        //submit form via Ajax or fetch
    }

```
See **index.html** file for example.

*Note:* The callback option is compulsory only for testing purposes during development. Include it when deploying to production.

Do no include the callback parameter without specifying the length.

### Security Features
- Maximum number of trials(5) after which the person has to wait for 20 seconds before retrying.
- Captcha changes on invalid or failed submission.


