function Api() {
  this.fetchData = function () {
    const promise = axios({
      url: "https://65d8a743c96fbb24c1bc064b.mockapi.io/api/Product",
      method: "GET",
    });

    return promise;
  };

  this.delete = function (id) {
    const promise = axios({
      url: `https://65d8a743c96fbb24c1bc064b.mockapi.io/api/Product/${id}`,
      method: "DELETE",
    });

    return promise;
  };

  this.add = function (product) {
    const promise = axios({
      url:"https://65d8a743c96fbb24c1bc064b.mockapi.io/api/Product",
      method: "POST",
      data: product,
    });

    return promise;
  };

  this.getProductById = function (id) {
    const promise = axios({
      url: `https://65d8a743c96fbb24c1bc064b.mockapi.io/api/Product/${id}`,
      method: "GET",
    });

    return promise;
  };

  
  this.update = function (product) {
    const promise = axios({
      url: `https://65d8a743c96fbb24c1bc064b.mockapi.io/api/Product/${product.id}`,
      method: "PUT",
      data: product,
    });

    return promise;
  };
}
