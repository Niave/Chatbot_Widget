(()=>{window.initChatbot=function(i={}){let{botName:z=i.botName||"X",assistantTitle:I=i.assistantTitle||"AI Assistent - X",greetingHTML:j=i.greetingHTML||`
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
        </div>`,webhookURL:N=i.webhookURL||"https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv",logoSrc:k=i.logoSrc||"Images/Mustafa.png",buttonColor:u=i.buttonColor||"#A0430A",buttonHoverColor:p=i.buttonHoverColor||"#8C3708",customBackgroundColor:A=i.customBackgroundColor||"#f9f9f9"}=i,e=document.createElement("div");e.id="chatbot-button",e.innerHTML="\u{1F4AC}",e.style.position="fixed",e.style.bottom="20px",e.style.right="20px",e.style.width="50px",e.style.height="50px",e.style.backgroundColor=u,e.style.color="white",e.style.borderRadius="50%",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.fontSize="24px",e.style.cursor="pointer",e.style.boxShadow="0 4px 15px rgba(0, 0, 0, 0.3)",e.style.userSelect="none",e.addEventListener("mouseover",()=>{e.style.backgroundColor=p}),e.addEventListener("mouseout",()=>{e.style.backgroundColor=u}),document.body.appendChild(e);let C=document.createElement("div");document.body.appendChild(C),window.addEventListener("resize",()=>{let o=window.innerHeight*.007;document.documentElement.style.setProperty("--vh",`${o}px`)});let E=C.attachShadow({mode:"open"}),M=document.createElement("style");M.textContent=`
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
    background-color: ${u};
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
    background-color: ${p};
}

/* Navbar styling */
#chatbot-navbar {
    background-color: ${p};
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
    background-color: ${u};
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
    background-color: ${u};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#chatbot-container .input-box button:hover {
    background-color: ${p};
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
        background-color: ${p};
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
        height:100%;
        max-height:570px;
        max-width: 350px;
        background-color: white;
        overflow-y: auto;
        display: flex;
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
        background-color: ${p};
        color: white;
    }

    /* Navbar styling */
    #chatbot-navbar {
        flex-shrink: 0;
        font-size: 16px;
        padding: 8px;
        position: relative;
        background-color: ${p};
        color: white;
        
    }
}


    `,E.appendChild(M);let n=document.createElement("div");n.id="chatbot-container",E.appendChild(n);let c=document.createElement("div");c.id="chatbot-navbar";let T=document.createElement("img");T.src=k,c.appendChild(T);let S=document.createElement("span");S.textContent=z,c.appendChild(S);let r=document.createElement("button");r.innerHTML="&minus;",r.style.fontSize="20px",r.style.cursor="pointer",r.style.background="transparent",r.style.border="none",r.style.color="#fff",r.style.marginLeft="auto",c.appendChild(r);let a=document.createElement("button");a.innerHTML="&times;",a.style.fontSize="20px",a.style.cursor="pointer",a.style.background="transparent",a.style.border="none",a.style.color="#fff",c.appendChild(a),n.appendChild(c),r.addEventListener("click",()=>{n.style.display="none",e.style.display="flex"}),a.addEventListener("click",()=>{n.style.display="none",e.style.display="flex",Array.from(t.children).forEach(o=>{o.classList.contains("message")&&o.remove()}),y=!1});let t=document.createElement("div");t.id="chat-messages",n.appendChild(t);let h=document.createElement("div");h.id="info-container",t.appendChild(h);let d=document.createElement("img");d.src=k,d.id="info-logo",h.appendChild(d);let g=document.createElement("p");g.textContent=I,h.appendChild(g),h.style.textAlign="center",h.style.padding="10px",d.style.display="block",d.style.margin="0 auto",d.style.width="50px",d.style.height="50px",d.style.borderRadius="50%",g.style.fontWeight="bold",g.style.marginTop="10px",g.style.color="#333",g.style.fontFamily='-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", sans-serif',t.style.maxHeight="500px",t.style.padding="10px",t.style.transition="max-height 0.3s ease-in-out";let x=document.createElement("div");x.className="input-box",n.appendChild(x);let l=document.createElement("input");l.id="user-message",l.type="text",l.placeholder="Type a message...",l.autocomplete="off",x.appendChild(l);let b=document.createElement("button");b.id="send-button",b.textContent="Send",x.appendChild(b);let y=!1,B=A;n.style.backgroundColor=B,e.addEventListener("click",()=>{n.style.display==="none"||n.style.display===""?(n.style.display="block",e.style.display="none",y||(m(j,"bot"),y=!0)):(n.style.display="none",e.style.display="flex")});function H(){let o=l.value.trim();o&&(m(o,"user"),l.value="",$(o))}function m(o,s){let f=document.createElement("div");f.className="message "+s,f.innerHTML=o,t.appendChild(f),y?(t.style.overflowY="auto",t.scrollTop=t.scrollHeight):t.style.overflowY="hidden",t.scrollHeight>t.clientHeight&&(t.style.overflowY="auto")}async function $(o){try{let s=document.createElement("div");s.className="message bot thinking-message",s.innerHTML="...",t.appendChild(s),t.scrollTop=t.scrollHeight,new Typewriter(s,{loop:!0,delay:150,cursor:""}).typeString("...").start();let w=await fetch(N,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_message:o})});if(!w.ok){console.error(`Error: HTTP status ${w.status}`);return}let L=await w.text();try{let v=JSON.parse(L);v.response?setTimeout(()=>{s.remove(),m(v.response,"bot")},2e3):console.error('Response does not contain "response" field')}catch(v){console.error("Error parsing response as JSON:",v),setTimeout(()=>{s.remove(),m(L,"bot")},2e3)}}catch(s){console.error("Error:",s),thinkingMessage.remove(),m("Sorry, there was an error processing your request.","bot")}}b.addEventListener("click",H),l.addEventListener("keypress",function(o){o.key==="Enter"&&(o.preventDefault(),H())})};})();
