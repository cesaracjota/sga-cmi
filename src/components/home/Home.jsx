import React, { useEffect } from 'react'
import {
  Flex,
  Stack,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Button,
  Image,
  Divider,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getReportesEBR, reset } from '../../features/reporteSlice';
import { ToastChakra } from '../../helpers/toast';
import { Loading } from '../../helpers/Loading';
import { FiArrowRight } from 'react-icons/fi';
import { TableComponent } from './TableComponent';
import moment from 'moment';
import SalesChartMonth from './SalesChartMonth';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reportePagos, ventasDia, dataforGraph, ventasSemana, ventasMes, isLoading, isError, message } = useSelector((state) => state.reportes);

  useEffect(() => {

    dispatch(getReportesEBR());

    return () => {
      dispatch(reset());
    }

  }, [dispatch, navigate]);

  if (isError) {
    ToastChakra('Error', message, 'error', 1500);
    console.log(message);
  }

  if (isLoading) {
    return <Loading />
  }

  const getTiempoTranscurrido = (createdAt) => {
    const fechaCreacion = moment(createdAt);
    const fechaActual = moment();
    const tiempoTranscurrido = moment.duration(fechaActual.diff(fechaCreacion));
    return tiempoTranscurrido.humanize();
};

const columns = [
    {
        Header: 'CODIGO',
        accessor: 'codigo'
    },
    {
        Header: 'ESTUDIANTE',
        accessor: 'estudiante.nombres',
        Cell: (row) => (
            <Text noOfLines={1}>{row.value} {row.row.original.estudiante.apellidos}</Text>
        )
    },
    {
        Header: 'IMPORTE',
        accessor: 'importe',
        Cell: (row) => (
            <Text noOfLines={1}>S/{row.value}</Text>
        ),
    },
    {
        Header: 'TIEMPO',
        accessor: 'updatedAt',
        Cell: (row) => (
            <Text noOfLines={1}>hace {getTiempoTranscurrido(row.value)}</Text>
        )
    },
    {
        Header: 'ESTADO',
        accessor: 'estado',
        Cell: (row) => (
            <Badge colorScheme={row.value === 'CANCELADO' ? 'green' : 'red'}>{row.value}</Badge>
        )
    },
    {
        accessor: "_id",
        Cell: (row) => (
            <Stack direction="row" display={'flex'} spacing={0} justifyContent="center">
                <Link to={{
                    pathname: '/ebr/pagos/boleta/' + row.value
                }}>
                    <IconButton
                        icon={<FiArrowRight fontSize={22} />}
                        variant="ghost"
                        rounded="full"
                        colorScheme="gray"
                        onClick={() => console.log(row.value)}
                    />
                </Link>
            </Stack>
        ),
        disableSortBy: true,
        disableFilters: true,
        disableGroupBy: true,
    },
];

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Stack spacing={4} w="full" direction={'column'}>
        <Heading fontWeight="extrabold" fontSize={{ base: "sm", lg: "3xl" }}>
          SGA - Dashboard
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2}>
          <CardHome
            montoRecaudado={reportePagos?.totalVentasDia}
            textHeader="Total Recaudado de Hoy"
            textButton="Ver"
            cardImage="https://material-kit-pro-react.devias.io/assets/iconly/iconly-glass-tick.svg"
          />
          <CardHome
            montoRecaudado={reportePagos?.totalVentasSemana}
            textHeader="Total Recaudado de la Semana"
            textButton="Ver"
            cardImage="https://material-kit-pro-react.devias.io/assets/iconly/iconly-glass-info.svg"
          />
          <CardHome
            montoRecaudado={reportePagos?.totalVentasMes}
            textHeader="Total Recaudado del Mes"
            textButton="Ver"
            cardImage="https://material-kit-pro-react.devias.io/assets/iconly/iconly-glass-paper.svg"
          />
          <CardHome
            montoRecaudado={reportePagos?.totalVentasAnio}
            textHeader="Total Recaudado del Año"
            textButton="Ver"
            cardImage="https://material-kit-pro-react.devias.io/assets/iconly/iconly-glass-discount.svg"
          />
        </SimpleGrid>
        <Divider />
        <SalesChartMonth data={dataforGraph} />
        <Divider />
        <Stack
          boxShadow={'base'}
          bg="white"
          _dark={{ bg: "primary.1000" }}
          rounded={'2xl'}
          p={4}
        >
          <Tabs variant="unstyled" position="relative">
            <TabList>
              <Tab
                _selected={{
                  color: 'purple.500',
                }}
              >
                Dia
              </Tab>
              <Tab
                _selected={{
                  color: 'purple.500',
                }}
              >
                Semana
              </Tab>
              <Tab
                _selected={{
                  color: 'purple.500',
                }}
              >
                Mes
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="purple.500"
              borderRadius="2px"
            />
            <TabPanels>
              <TabPanel>
                <TableComponent data={ventasDia} columns={columns} />
              </TabPanel>
              <TabPanel>
                <TableComponent data={ventasSemana} columns={columns} />
              </TabPanel>
              <TabPanel>
                <TableComponent data={ventasMes} columns={columns} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default Home;

const CardHome = ({ montoRecaudado, textHeader, textButton, cardImage }) => {

  const textColor = useColorModeValue('gray.700', 'gray.100');

  return (
    <Stack
      boxShadow={'base'}
      bg="white"
      _dark={{ bg: "primary.1000" }}
      rounded={'2xl'}
      p={2}
    >
      <Stack spacing={4} align={'center'} p={2} direction="row">
        <Image
          src={cardImage}
          boxSize={{
            base: '40px',
            md: '40px',
            lg: '50px'
          }}
        />
        <Stack direction="column" spacing={0}>
          <Text color={'gray.500'} fontSize="xs" noOfLines={1}>{textHeader}</Text>
          <Text fontWeight={600} color={textColor} fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}>
            S/{montoRecaudado}
          </Text>
        </Stack>
      </Stack>
      <Divider />
      <Stack p={1}>
        <Stack spacing={0} align={'start'}>
          <Button
            colorScheme="gray"
            variant="ghost"
            rightIcon={<Icon as={FiArrowRight} boxSize="16px" />}
            color={textColor}
            rounded="xl"
            size={{
              base: 'xs',
              md: 'xs',
              lg: 'sm'
            }}
          >
            {textButton}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}