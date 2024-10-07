(function(d) {
    function onair() {
      const dj = d.querySelector('#dj'), // <img id="dj">
            tx = d.querySelector('#txt'), // <div id="txt"></div>
            nd = new Date(),
            dy = nd.getDay(),
            hr = nd.getHours(),                            
            mn = nd.getMinutes();

      switch (dy) {
        case 1: // Monday
          if ((hr === 01 && mn <=00) || (hr === 20 && mn <=00))
            dj.src = 'djimages/nodj.png';
          break;
        case 2: // Tuesday
          if ((hr === 01 && mn <=00) || (hr === 20 && mn <=00))
            dj.src = 'djimages/nodj.png';
          break;
        case 3: // Wednesday
          if ((hr === 01 && mn <=00) || (hr === 20 && mn <=00))
            dj.src = 'djimages/nodj.png';
          break;
        case 4: // Thursday
          if (hr === 20 && mn <=00) {
            dj.src = 'djimages/strawbs.jpg';
            tx.innerHTML = 'Thursday at 9 PM<br>Request<br>With Strawbs';
          }
          break;
        case 5: // Friday
          if ((hr === 01 && mn <=00) || (hr === 20 && mn <=00))
            tx.innerHTML = 'Friday at 10 AM<br>Christian Music<br>with Dj Bunny';
          break;
        case 6: // Saturday
          if ((hr === 01 && mn <=00) || (hr === 20 && mn <=00))
            tx.innerHTML = 'Saturday at 8 AM<br>Christian Music<br>with Dj Bunny';
          break;
        case 0: // Sunday
          if (hr === 20 && mn <=00) {
            dj.src = 'djimages/strawbs.jpg';
            tx.innerHTML = 'Sunday at 9 PM<br>Request<br>with Strawbs';
          }
          break;
        default:
          dj.src='djimages/off-air.jpg';
          break;
      }