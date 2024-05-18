const playlistSheet = 'playlist'
const email = 'jayaubs89@gmail.com'

function showSidebar(){
  const ui = SpreadsheetApp.getUi()
  const html = HtmlService.createHtmlOutputFromFile("index.html")
  html.setTitle("Request song")
  ui.showSidebar(html)
}

function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('Sidebar')
    .addItem('Open', 'showSidebar')
    .addToUi();
}

function sendEmail(obj){
  const {artist, song} = obj
  console.log(obj)
  const time = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "HH:MM:SS")
  const body = `New request:\n\nArtist: ${artist}\nSong: ${song}`
  GmailApp.sendEmail(email, `New request: ${time}`, body)
  SpreadsheetApp.getUi().alert(`Requested: Artist: ${artist} | Song: ${song}`)
}

function getCrrentRowData(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const activeSheet = ss.getActiveSheet()
  if(activeSheet.getName() != playlistSheet) { return }

  const row = activeSheet.getActiveRange().getRow()
  const [ artist, song ] = activeSheet.getRange(row,1,1,2).getValues().flat()
  return {artist, song}

}

function sleep(){
  Utilities.sleep(1500)
  return;
}