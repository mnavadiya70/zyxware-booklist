import {
  Box,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import bookDetailsStore from "./BookDetailsStore";
import { observer } from "mobx-react-lite";

const BookDetails = observer(() => {
  const { bookDetail } = bookDetailsStore;
  const params = useParams();

  useEffect(() => {
    bookDetailsStore.get(params.id ?? "");
  }, []);

  return (
    <Container maxWidth="md">
      <Card>
        <CardActionArea>
          {bookDetail ? (
            <>
              <CardMedia
                component="img"
                style={{ objectFit: "contain" }}
                src={bookDetail.image}
                title={bookDetail.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {bookDetail.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {bookDetail.summary}
                </Typography>
              </CardContent>
            </>
          ) : (
            <>No details found</>
          )}
        </CardActionArea>
      </Card>
    </Container>
  );
});

export default BookDetails;
