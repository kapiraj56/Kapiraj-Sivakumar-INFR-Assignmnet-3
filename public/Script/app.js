// immediately invoked function expression

(function(){
    function Start(){
        console.log("Server Started");
    }
    window.addEventListener("load",Start);
})();