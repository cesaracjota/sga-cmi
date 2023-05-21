import React from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';

const Footer = ({ isOpen }) => {
    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="justify-between"
                ml={{
                    base: 0,
                    lg: isOpen ? "280px" : "0"
                }}
                transition=".08s ease-out"
            >
                <Flex
                    w="full"
                    as="footer"
                    flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
                    align="center"
                    justify="space-between"
                    px="6"
                    py="4"
                    bgColor="#f8f9fa"
                    _dark={{
                        bg: "primary.1100",
                    }}
                >
                    <Text fontSize="xs" color="gray.700" _dark={{ color: 'gray.200' }}>
                        © { new Date().getFullYear() } <chakra.a fontWeight={'bold'}>Colegio Maria Inmaculada</chakra.a> All rights reserved
                    </Text>

                    <Flex>
                        <Text fontSize="xs" color="gray.700" _dark={{ color: 'gray.200' }}>
                            Made with ❤️ by <chakra.a target={'_blank'} fontWeight={'bold'} href="https://cesaracjota.vercel.app/">Cesar Acjota</chakra.a>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Footer