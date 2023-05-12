const fileInputField = document.querySelector('input'),
downloadButton = document.querySelector('button');

downloadButton.addEventListener('click', (e) => {
    e.preventDefault(); // this line of code is aimed at preventing the form from auto-submitting
    downloadButton.innerText = 'Downloading File...';
    fetchFile(fileInputField.value);

});

// creating a function that will fetch the url of the file & return the response as blob
// read MDN guides on Blob
fetchFile = (url) => {
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjURL creates a url of the passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        aTag.href = tempUrl; // passing tempUrl as href value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, ''); // passing file last name & extension as the download value of <a> tag
        document.body.appendChild(aTag); // adding <a> tag inside the body
        aTag.click(); // clicking the <a> tag generated so the file downloads
        aTag.remove(); // removing the <a> tag link generated after the file has been downloaded
        URL.revokeObjectURL(tempUrl); // removing tempUrl from the document
        downloadButton.innerText = 'Download File';


    }).catch(() => {
        // using the catch method to call if any error comes up during downloading
        downloadButton.innerText = 'Download File';
        alert('File Download Failed!');
    });

};