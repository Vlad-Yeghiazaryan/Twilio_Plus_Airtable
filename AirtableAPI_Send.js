const btn = document.getElementById('btn')

const fetchApi = async (fn, ln) => {
  const rawResponse = await fetch('https://capri-donkey-6355.twil.io/myapiend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        name: fn,
        url: ln
      }
    )
  })
  const content = await rawResponse
  console.log(content)
}
btn.addEventListener('click', async () => {
  const firstname = document.getElementById('fn').value
  const lastname = document.getElementById('ln').value
  fetchApi(firstname, lastname)
})
