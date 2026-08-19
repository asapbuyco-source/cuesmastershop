// WhatsApp Floating Widget
const whatsappStyle = document.createElement('style');
whatsappStyle.innerHTML = `
.whatsapp-float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
}
.whatsapp-float svg {
  width: 35px;
  height: 35px;
  fill: white;
}
.whatsapp-float:hover {
  background-color: #1ebe57;
  transform: scale(1.1);
}
@media (max-width: 768px) {
  .whatsapp-float {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }
  .whatsapp-float svg {
    width: 28px;
    height: 28px;
  }
}
`;
document.head.appendChild(whatsappStyle);

const whatsappHTML = `
<a href="https://wa.me/YOUR_PHONE_NUMBER_HERE" class="whatsapp-float" target="_blank" title="Chat with us on WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.2c-32.6 0-64.6-8.8-92.4-25.3l-6.6-4-68.6 18 18.3-66.9-4.4-7.1c-18.6-29.6-28.4-64-28.4-98.8 0-104.4 84.9-189.4 189.4-189.4 50.6 0 98.2 19.7 134 55.5 35.8 35.8 55.5 83.4 55.5 134 0 104.5-84.9 189.4-189.4 189.4zM327.7 289c-5.7-2.9-33.8-16.7-39-18.6-5.2-1.9-9-2.9-12.8 2.9s-14.7 18.6-18 22.4c-3.3 3.8-6.6 4.3-12.3 1.4-5.7-2.9-24.1-8.9-45.9-28.4-17-15.2-28.5-34-31.9-39.7-3.3-5.7-.4-8.8 2.5-11.6 2.6-2.6 5.7-6.6 8.5-10 2.8-3.3 3.8-5.7 5.7-9.5 1.9-3.8 .9-7.1-.5-10-1.4-2.9-12.8-30.9-17.5-42.3-4.6-11.2-9.3-9.7-12.8-9.9-3.3-.2-7.1-.2-10.9-.2-3.8 0-10 1.4-15.2 7.1-5.2 5.7-20.4 19.9-20.4 48.5s20.9 56.3 23.7 60.1c2.8 3.8 40.8 62.4 98.9 87.5 13.8 5.9 24.6 9.4 33 12 13.9 4.4 26.6 3.8 36.6 2.3 11.2-1.7 33.8-13.8 38.6-27.1 4.7-13.3 4.7-24.6 3.3-27.1-1.4-2.4-5.2-3.8-10.9-6.6z"/>
  </svg>
</a>
`;
document.body.insertAdjacentHTML('beforeend', whatsappHTML);
