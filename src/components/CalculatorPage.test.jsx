
it('get timezone in API', () => {

    fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=UFV4EW6OEFHO&format=json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            expect(data.status).toBe("OK");
        })
})
