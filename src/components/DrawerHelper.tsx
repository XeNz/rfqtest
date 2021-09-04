import { CheckIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Text, DrawerHeader, DrawerBody, useDisclosure, Box, Container, Heading, HStack, Icon, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TextDto } from '../models/models';
import { rfqService } from '../services/RfqHelpService';

export default function DrawerHelper() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [headerText, setHeaderText] = useState<String | undefined>(undefined);
  const [text, setText] = useState<Array<TextDto>>([]);

  useEffect(() => {
    console.log("fetching help text");
    const fetchedText = rfqService.getHelpText();
    setText(fetchedText);
    const headerText = rfqService.getHelpHeaderText();
    setHeaderText(headerText);
  }, [])


  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Help me
      </Button>
      <Drawer
        size={"xl"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Need some help?</DrawerHeader>

          <DrawerBody>
            <Box p={4}>
              <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>This is the headline</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
{headerText}
                </Text>
              </Stack>

              <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
                  {text.map((t) => (
                    <HStack key={t.id} align={'top'}>
                      <Box color={'green.400'} px={2}>
                        <Icon as={CheckIcon} />
                      </Box>
                      <VStack align={'start'}>
                        <Text fontWeight={600}>{t.title}</Text>
                        <Text color={'gray.600'}>{t.text}</Text>
                      </VStack>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Container>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
