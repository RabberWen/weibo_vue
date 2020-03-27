export default{
    post(url,data){
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest()
            xhr.open("post",url)
            xhr.setRequestHeader("content-type","application/json")
            xhr.send(JSON.stringify(data))
            xhr.onreadystatechange=()=>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject("网络异常:"+xhr.statusText);
                    }
                }
            }
        })
    },
    get(url,{params}){
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            url= url + (url.includes("?")?"&":"?") +Object.keys(params).map(v=>v+"="+params[v]).join("&")
            xhr.open("get",url);
            xhr.send();
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject("网络异常:"+xhr.statusText);
                    }
                }
            }
        })
    },
    delete(url,{params}){
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            url = url + (url.includes("?")?"&":"?") +Object.keys(params).map(v=>v+"="+params[v]).join("&")
            xhr.open("delete",url)
            xhr.send()
            xhr.onreadystatechange=()=>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject("网络异常:"+xhr.statusText);
                    }
                }
            }
        })
    },
    put(url,{params}){
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            url = url + (url.includes("?")?"&":"?") +Object.keys(params).map(v=>v+"="+params[v]).join("&")
            xhr.open("put",url)
            xhr.send()
            xhr.onreadystatechange=()=>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject("网络异常:"+xhr.statusText);
                    }
                }
            }
        })
    },
}