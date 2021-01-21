export const downloadFile = (content, filenameWithType, type = 'text/plain') => {
    const fakeLink = document.createElement('a');
    fakeLink.style.display = 'none';
    document.body.appendChild(fakeLink);
    const blob = new Blob([content], { type });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filenameWithType);
    } else {
        fakeLink.setAttribute('href', URL.createObjectURL(blob));
        fakeLink.setAttribute('download', filenameWithType);
        fakeLink.click();
    }
};

export const downloadAsCSV = (content, filename) => downloadFile(content, `${filename}.csv`, 'text/csv');
export const downloadAsXML = (content, filename) => downloadFile(content, `${filename}.xml`, 'application/xml');
export const downloadAsJSON = (content, filename) => downloadFile(content, `${filename}.json`, 'application/json');
