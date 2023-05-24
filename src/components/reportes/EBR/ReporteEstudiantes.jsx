import React from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import CardItems from './CardItems';
import { FaUserTie } from 'react-icons/fa';
import { Loading } from '../../../helpers/Loading';
import Chart from "react-apexcharts";

const ReporteEstudiantesEBR = ({ reportesEBR, isLoading }) => {

    const modalities = ["EBR", "CEBA"];

    const count = [reportesEBR?.countEstudiantesEBR || 0, reportesEBR?.countEstudiantesCEBA || 0];

    // Configuración del gráfico
    const options = {
        chart: {
            type: "pie",
            toolbar: {
                show: true,
            },
        },
        series: count ? count : [],
        labels: modalities,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "top",
                    },
                },
            },
        ],
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                <CardItems
                    total={reportesEBR?.totalEstudiantes}
                    textHeader={'Total Estudiantes'}
                    textButton={'Ver más'}
                    icon={FaUserTie}
                />
                <CardItems
                    total={reportesEBR?.countEstudiantesEBR}
                    textHeader={'Estudiantes EBR'}
                    textButton={'Ver más'}
                    icon={FaUserTie}
                />
                <CardItems
                    total={reportesEBR?.countEstudiantesCEBA}
                    textHeader={'Estudiantes CEBA'}
                    textButton={'Ver más'}
                    icon={FaUserTie}
                />
            </SimpleGrid>

            <Stack
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.1000", color: 'black' }}
                rounded={'2xl'}
                p={6}
                mt={4}
            >
                <Chart options={options} series={options?.series || []} type={'pie'} height={400} />
            </Stack>
        </>
    )
}

export default ReporteEstudiantesEBR;