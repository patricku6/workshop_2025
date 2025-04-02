import { useState, useEffect } from 'react';
import { Container, Title, Text, Grid, Card, Image, Group, Textarea, Button } from '@mantine/core';
import Template from "./Template.jsx";
import axios from 'axios';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: '', message: '', image: null });

    useEffect(() => {
        axios.get('/reviews/get')
            .then(response => setReviews(response.data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newReview.name);
        formData.append('message', newReview.message);
        formData.append('image', newReview.image);

        axios.post('/reviews/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setReviews([...reviews, response.data]);
                setNewReview({ name: '', message: '', image: null });
            })
            .catch(error => console.error('Error submitting review:', error));
    };

    return (
        <>
            <Template />
            <Container size="lg" py="xl" className="select-none">
                {/* Hero Section */}
                <Title align="center" my="lg" color="#1c64f2">Wat onze klanten zeggen</Title>
                <Text align="center" size="lg" color="dimmed">Lees de ervaringen van onze tevreden klanten</Text>

                {/* Add Review Form */}
                <Title order={2} mt="xl" color="#1c64f2">Schrijf een review</Title>
                <form onSubmit={handleSubmit}>
                    <Textarea
                        placeholder="Uw naam"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        required
                        mt="md"
                    />
                    <Textarea
                        placeholder="Uw bericht"
                        value={newReview.message}
                        onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
                        required
                        mt="md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewReview({ ...newReview, image: e.target.files[0] })}
                        style={{ marginTop: '1rem' }}
                    />
                    <br></br>
                    <Button type="submit" variant="filled" color="#1c64f2" mt="md">Verstuur</Button>
                </form>

                {/* Reviews Section */}
                <Grid mt="xl">
                    {reviews.map((review, index) => (
                        <Grid.Col span={4} key={index}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                {review.image && (
                                    <Image
                                        src={`/storage/${review.image}`} // Adjust the path if necessary
                                        alt={review.name}
                                        height={150}
                                        fit="cover"
                                    />
                                )}
                                <Text weight={500} mt="md">{review.name}</Text>
                                <Text size="sm" color="dimmed" mt="sm">{review.message}</Text>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    );
}