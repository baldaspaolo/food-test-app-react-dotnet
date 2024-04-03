import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const Home = () => {
  return (
    <div
      className="p-grid p-nogutter p-align-center"
      style={{ height: "50vh", padding: "20px" }}
    >
      <div className="p-col-12 p-md-6">
        <h1>Welcome to Our Website</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          feugiat magna non vestibulum. Mauris in lacus ut lacus feugiat
          venenatis. Integer vitae sapien sit amet tortor interdum congue. Ut
          quis leo vitae velit dictum congue in non massa. Suspendisse potenti.
          Morbi sodales libero eget odio consectetur consectetur. Donec sed
          lobortis dui. Sed fringilla orci non nunc lacinia euismod.
        </p>
      </div>
      <div className="p-col-12 p-md-6">
        <Card
          title="Featured Product"
          subTitle="Lorem Ipsum"
          style={{ width: "100%" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            sodales aliquam lorem id auctor. Vestibulum in velit ligula. Vivamus
            in tellus ac justo volutpat maximus vel nec tortor. Sed aliquam odio
            nec ultricies ullamcorper. Sed vehicula sapien sit amet justo
            gravida, in pellentesque justo facilisis.
          </p>
          <Button
            label="View Product"
            icon="pi pi-search"
            className="p-button-raised p-button-secondary"
          />
        </Card>
      </div>
    </div>
  );
};

export default Home;
