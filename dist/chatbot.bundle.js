(()=>{window.initChatbot=function(i={}){if(window.chatbotInitialized)return;window.chatbotInitialized=!0;let{botName:N=i.botName||"X",assistantTitle:A=i.assistantTitle||"AI Assistent - X",greetingHTML:$=i.greetingHTML||`
        <div style="display: flex; align-items: center; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif; color: #333; line-height: 1.6; font-size: 16px;">
         <div>
           <p style="margin-bottom: 15px;">Hei og velkommen!</p>
           <p style="margin-bottom: 15px;">Jeg er en AI-assistent fra <strong>Mustafa Chatbots</strong>.</p>
           <p style="margin-bottom: 15px;">Vi lager skreddersydde chatbots som hjelper bedrifter med kundeservice og salg \u2013 d\xF8gnet rundt.</p>
           <p style="margin-bottom: 15px;">Ta gjerne kontakt p\xE5 
             <a href="mailto:kundeservice@Mustafa.no" style="color: #1a73e8; text-decoration: none;">kundeservice@Mustafa.no</a> hvis du vil vite mer.
           </p>
           <p style="font-size: 15px; font-weight: bold; color: #333; margin-top: 15px;">Hva vil du teste i dag?</p>
         </div>
        </div>`,webhookURL:B=i.webhookURL||"https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv",logoSrc:M=i.logoSrc||"Images/Mustafa.png",buttonColor:x=i.buttonColor||"#A0430A",buttonHoverColor:c=i.buttonHoverColor||"#8C3708",customBackgroundColor:R=i.customBackgroundColor||"#f9f9f9",MobileChatHeight:U=i.MobileChatHeight||"570px"}=i,e=document.createElement("div");e.id="chatbot-button",e.innerHTML="\u{1F4AC}",e.style.position="fixed",e.style.bottom="20px",e.style.right="20px",e.style.width="50px",e.style.height="50px",e.style.backgroundColor=x,e.style.color="white",e.style.borderRadius="50%",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.fontSize="24px",e.style.cursor="pointer",e.style.boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)",e.style.userSelect="none",e.addEventListener("mouseover",()=>{e.style.backgroundColor=c}),e.addEventListener("mouseout",()=>{e.style.backgroundColor=x}),document.body.appendChild(e);let I=document.createElement("div");document.body.appendChild(I),window.addEventListener("resize",()=>{let t=window.innerHeight*.007;document.documentElement.style.setProperty("--vh",`${t}px`)});let H=I.attachShadow({mode:"open"}),S=document.createElement("style");S.textContent=`
/* Chatbot container with solid border */
#chatbot-container {
    position: fixed;
    bottom: 40px;
    right: 20px;
    width: 380px;
    min-height: 40vh;
    max-height: 90vh;
    display: none;
    z-index: 9999;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif;
    border: 2px solid #ccc;
    color: #333
}

/* Chatbot button */
#chatbot-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: ${x};
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
    user-select: none;
}

#chatbot-button:hover {
    background-color: ${c};
}

/* Navbar styling */
#chatbot-navbar {
    background-color: ${c};
    padding: 10px;
    color: white;
    font-size: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#chatbot-navbar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

/* Chat messages container */
#chat-messages {
    padding: 15px;  /* Increased padding for a cleaner look */
    overflow-y: auto;
    max-height: calc(100% - 80px);
    min-height: 450px;
    background-color: #f9f9f9;
    font-size: 16px; /* Adjusted font size */
    line-height: 1.5; /* Increased line height */
}

/* Thinking message styling */
#chat-messages .thinking-message {
    padding: 8px 12px;
    border-radius: 15px;
    margin-bottom: 8px;
    max-width: 80%;
    clear: both;
    word-wrap: break-word;
    white-space: nowrap;
    overflow: hidden;
    width: 20px;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    text-overflow: ellipsis;
}

/* Message styling */
#chat-messages .message {
    padding: 10px 15px;  /* Added more padding for better spacing */
    border-radius: 15px;
    margin-bottom: 12px;  /* Adjusted bottom margin */
    max-width: 80%;
    clear: both;
    word-wrap: break-word;
    line-height: 1.5;  /* Improved line-height for messages */
}

/* User message */
#chat-messages .user {
    background-color: ${x};
    color: white;
    float: right;
    margin-left: 30px;
    border-radius: 15px 15px 0px 15px;
}

/* Bot message */
#chat-messages .bot {
    background-color: #e0e0e0;
    color: black;
    float: left;
    margin-right: 30px;
    border-radius: 15px 15px 15px 0px;
}

/* Input box */
#chatbot-container .input-box {
    display: flex;
    padding: 12px; /* Increased padding for better UI */
    border-top: 1px solid #ccc;
    background-color: #f9f9f9;
}

#chatbot-container .input-box input {
    flex-grow: 1;
    padding: 12px;  /* Added more padding */
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

#chatbot-container .input-box button {
    padding: 12px;  /* Adjusted padding */
    margin-left: 10px;
    background-color: ${x};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#chatbot-container .input-box button:hover {
    background-color: ${c};
}

/* Responsive Design for Mobile */
@media (max-width: 767px) {
    /* Chatbot button at the bottom */
    #chatbot-button {
        bottom: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        font-size: 20px;
        border-radius: 50%;
        background-color: ${c};
        color: white;
        text-align: center;
        position: sticky;
        z-index: 9999; /* Ensure it's always on top */
        
    }

    /* Chatbot container */
    #chatbot-container {
        position: fixed;
        bottom: 0px;
        right: 0px;
        width: 100%;
        min-height:${U};
        max-width: 350px;
        background-color: white;
        overflow: hidden;
        display: none;
        flex-direction: column;
        transition: all 0.3s ease; /* Smooth transition */
    }

    /* Chat messages container */
    #chat-messages {
        padding: 10px;
        overflow-y: auto;
        flex-grow: 1
    }

    /* Input box styling */
    #chatbot-container .input-box {
        padding: 8px;
        background-color: #f1f1f1;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;  /* Prevent shrinking */
        margin-top: auto
    }

    #chatbot-container .input-box input {
        font-size: 14px;
        width: 85%; /* Ensure the input is not too wide */
        padding: 8px;
        border-radius: 5px;

    }

    #chatbot-container .input-box button {
        font-size: 14px;
        padding: 8px;
        border-radius: 5px;
        background-color: ${c};
        color: white;
    }

    /* Navbar styling */
    #chatbot-navbar {
        flex-shrink: 0;
        font-size: 16px;
        padding: 8px;
        position: relative;
        background-color: ${c};
        color: white;
        
    }
}


    `,H.appendChild(S);let n=document.createElement("div");n.id="chatbot-container",H.appendChild(n);let g=document.createElement("div");g.id="chatbot-navbar";let T=document.createElement("img");T.src=M,g.appendChild(T);let L=document.createElement("span");L.textContent=N,g.appendChild(L);let r=document.createElement("button");r.innerHTML="&minus;",r.style.fontSize="20px",r.style.cursor="pointer",r.style.background="transparent",r.style.border="none",r.style.color="#fff",r.style.marginLeft="auto",g.appendChild(r);let a=document.createElement("button");a.innerHTML="&times;",a.style.fontSize="20px",a.style.cursor="pointer",a.style.background="transparent",a.style.border="none",a.style.color="#fff",g.appendChild(a),n.appendChild(g),r.addEventListener("click",()=>{n.style.display="none",e.style.display="flex"}),a.addEventListener("click",()=>{n.style.display="none",e.style.display="flex",Array.from(o.children).forEach(t=>{t.classList.contains("message")&&t.remove()}),v=!1}),document.addEventListener("click",t=>{!n.contains(t.target)&&!e.contains(t.target)&&(n.style.display="none",e.style.display="flex")}),n.addEventListener("click",t=>{t.stopPropagation()});let o=document.createElement("div");o.id="chat-messages",n.appendChild(o);let u=document.createElement("div");u.id="info-container",o.appendChild(u);let l=document.createElement("img");l.src=M,l.id="info-logo",u.appendChild(l);let m=document.createElement("p");m.textContent=A,u.appendChild(m),u.style.textAlign="center",u.style.padding="10px",l.style.display="block",l.style.margin="0 auto",l.style.width="50px",l.style.height="50px",l.style.borderRadius="50%",m.style.fontWeight="bold",m.style.marginTop="10px",m.style.color="#333",m.style.fontFamily='-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", sans-serif',o.style.maxHeight="500px",o.style.padding="10px",o.style.transition="max-height 0.3s ease-in-out";let y=document.createElement("div");y.className="input-box",n.appendChild(y);let d=document.createElement("input");d.id="user-message",d.type="text",d.placeholder="Type a message...",d.autocomplete="off",y.appendChild(d);let f=document.createElement("button");f.id="send-button",f.textContent="Send",y.appendChild(f);let v=!1,P=R;n.style.backgroundColor=P,e.addEventListener("click",()=>{n.style.display==="none"||n.style.display===""?(n.style.display="block",e.style.display="none",v||(p($,"bot"),v=!0)):(n.style.display="none",e.style.display="flex")});function z(){let t=d.value.trim();t&&(p(t,"user"),d.value="",F(t))}function p(t,s){let h=document.createElement("div");h.className="message "+s,h.innerHTML=t,o.appendChild(h),v?(o.style.overflowY="auto",o.scrollTop=o.scrollHeight):o.style.overflowY="hidden",o.scrollHeight>o.clientHeight&&(o.style.overflowY="auto")}async function F(t){try{let s=document.createElement("div");s.className="message bot thinking-message",s.innerHTML="",o.appendChild(s),o.scrollTop=o.scrollHeight;let h=["",".","..","...","...."],b=0,C=1,w=setInterval(()=>{s.innerHTML=h[b],b+=C,b===h.length?(C=-1,b=h.length-2):b<0&&(C=1,b=1)},150),E=await fetch(B,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_message:t})});if(!E.ok){console.error(`Error: HTTP status ${E.status}`),clearInterval(w),s.remove(),p("Sorry, there was an error fetching the response.","bot");return}let j=await E.text();try{let k=JSON.parse(j);k.response?setTimeout(()=>{clearInterval(w),s.remove(),p(k.response,"bot")},2e3):(console.error('Response does not contain "response" field'),clearInterval(w),s.remove(),p("Sorry, the response format was unexpected.","bot"))}catch(k){console.error("Error parsing response as JSON:",k),setTimeout(()=>{clearInterval(w),s.remove(),p(j,"bot")},2e3)}}catch(s){console.error("Error:",s),clearInterval(typingInterval),thinkingMessage.remove(),p("Sorry, there was an error processing your request.","bot")}}f.addEventListener("click",z),d.addEventListener("keypress",function(t){t.key==="Enter"&&(t.preventDefault(),z())})};})();
