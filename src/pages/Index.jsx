import React, { useState } from "react";
import { Box, Button, Calendar, Container, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FaCalendarDay } from "react-icons/fa";
import { client } from "lib/crud";

const Index = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
  const [exercise, setExercise] = useState("");
  const toast = useToast();

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleExerciseChange = (event) => {
    setExercise(event.target.value);
  };

  const saveExercise = async () => {
    const key = `exercise:${date}`;
    const value = { date, exercise };
    const success = await client.set(key, value);
    if (success) {
      toast({
        title: "Exercise recorded",
        description: "We've recorded your exercise for the day.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "There was a problem recording your exercise.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Daily Exercise Tracker
        </Text>
        <Box>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input id="date" type="date" value={date} onChange={handleDateChange} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel htmlFor="exercise">Exercise Details</FormLabel>
            <Input id="exercise" placeholder="Describe your exercise" value={exercise} onChange={handleExerciseChange} />
          </FormControl>
        </Box>
        <Button leftIcon={<FaCalendarDay />} colorScheme="blue" onClick={saveExercise}>
          Record Exercise
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
