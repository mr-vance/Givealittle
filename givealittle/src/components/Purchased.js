import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import "./Purchased.css";

function Purchased(product) {
  return (
    <div className="card-cont">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              R {product.price}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Delivery:{" "}
              {product.delivery}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Purchased;
