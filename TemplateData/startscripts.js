createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "Build/slots39.data",
        frameworkUrl: "Build/slots39.framework.js",
        codeUrl: "Build/slots39.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Nikita Neufeld",
        productName: "SlotyWay",
        productVersion: "4",
      }).then((unityInstance) => {
		window.unityInstance = unityInstance;
		});
		
		setWindowSize();

	window.addEventListener("resize", setWindowSize);	
	  function setWindowSize() {
		
		var Width = innerWidth;
		var ConstHeight = innerHeight;
		
        var newHeightFloat;
        var newWidthFloat;
		
		newHeightFloat = Width / 1.7;
        Height = newHeightFloat;
		
		try {
			
		if (Height >  ConstHeight) {
			
                Height = ConstHeight;
                newWidthFloat = Height * 1.7;
                Width = newWidthFloat;

                document.getElementById("unity-canvas").style.width = Width + "px";
	            document.getElementById("unity-canvas").style.height = Height + "px";
		}
		else
            {
                document.getElementById("unity-canvas").style.width = Width + "px";
	            document.getElementById("unity-canvas").style.height = Height + "px";
            }
		}
		catch (error) {
			  console.error(error);
		}
	}

      vkBridge.send('VKWebAppInit');
	  
      function auth(){
        vkBridge.send('VKWebAppGetUserInfo').then(_info =>{
          console.log(_info);
          window.unityInstance.SendMessage('VKSDK', 'AuthenticateSuccess', JSON.stringify(_info));
        });
      }

      function getUserData(){
        vkBridge.send("VKWebAppStorageGet",{"keys":["_save"]}).then(data =>{
        console.log(data);
        window.unityInstance.SendMessage('VKSDK', 'DataGetting', JSON.stringify(data));
      });
	  }
	  
      function setUserData(data){
        console.log(data);
        vkBridge.send('VKWebAppStorageSet',{"key": "_save" , "value": data}).then(_info =>{
          console.log("Saved!")});
      }
	    
      function order(itemName) {
    var params = {
      type: 'item',
      item: itemName
    };
    VK.callMethod('showOrderBox', params);
  }

  var callbacksResults = document.getElementById('callbacks');

  VK.addCallback('onOrderSuccess', onOrderSuccess);
  VK.addCallback('onOrderFail', onOrderFail);
  VK.addCallback('onOrderCancel', onOrderCancel);

function onOrderSuccess()
{
   window.unityInstance.SendMessage("VKSDK", "ReceivecallbackFromVK", "success");
}
function onOrderFail()
{
   window.unityInstance.SendMessage("VKSDK", "ReceivecallbackFromVK", "Fail");
}
function onOrderCancel()
{
   window.unityInstance.SendMessage("VKSDK", "ReceivecallbackFromVK", "Cancel");
}
function showPriglos()
{
   vkBridge.send("VKWebAppShowInviteBox", {})
         .then(data => console.log(data.success))  
        .catch(error => console.log(error));
}
