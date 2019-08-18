const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const result = document.querySelector('#result');

const findAddress = async location => {
  const res = await fetch(`/weather?address=${location}`);
  const data = res.json();
  return data;
};

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;
  let html = '';
  result.innerHTML = 'Loading...';

  findAddress(location).then(data => {
    if (data.err) {
      html = `
        <div 
          class="notification is-danger" 
          style="margin-top: 4px;"
        >
        ${data.err}
        </div>
      `;
    } else {
      console.log(data);
      html = `
      <div class="card">
        <div class="card-content">
          <h4><span class="tag is-info">Location</span> ${data.location}</h4>
          <h4>
          <span class="tag is-info">Forecast</span> 
          ${data.forecastData}
          </h4>
        </div>
      </div>
    `;
    }
    result.innerHTML = html;
  });
});
