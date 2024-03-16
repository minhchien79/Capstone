function Api() {
  this.fetchData = function () {
    const promise = axios({
      url: "https://65d8a743c96fbb24c1bc064b.mockapi.io/api/Product",
      method: "GET",
    });

    return promise;
  };
}
