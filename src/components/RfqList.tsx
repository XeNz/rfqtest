import { EditIcon, LockIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Badge,
  Container,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  ScaleFade,
  SkeletonText,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { nlBE } from "date-fns/esm/locale";
import React, { useEffect, useState } from "react";
import useInterval from "../hooks/useInterval";
import { RfqDto } from "../models/models";
import _ from "lodash";

import { rfqService } from "../services/RfqService";

export default function RfqList() {
  const [Rfqs, setRfqs] = useState<Array<RfqDto>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const REFRESH_INTERVAL = 3000;
  const toast = useToast();

  const dataUpdatedToast = () => {
    toast({
      position: "top-right",
      status: "info",
      title: "Updated RFQ data",
    });
  };
  useEffect(() => {
    var millisecondsToWait = 500;
    setTimeout(function () {
      let fetchedData = rfqService.getRfqs();
      console.log("fetching initial data");
      setRfqs(fetchedData);
      setLoading(false);
    }, millisecondsToWait);
  }, []);

  useInterval(() => {
    const oldData = Rfqs;
    console.log("fetching new data");
    let fetchedData = rfqService.getRfqs();
    setRfqs(fetchedData);

    const hasChanged = !_.isEqual(oldData, fetchedData);
    if (hasChanged) {
      dataUpdatedToast();
    }
  }, REFRESH_INTERVAL);

  const Actions = (rfq: RfqDto) => {
    if (rfq.lockedBy != null && rfq.lockedUntil != null) {
      var date = new Date(rfq.lockedUntil);

      var formattedDate = format(date, "pppp", {
        locale: nlBE,
      });
      const lockedPopup = (
        <ScaleFade initialScale={0.3} in={true}>
          <Popover>
            <PopoverTrigger>
              <IconButton
                size="sm"
                colorScheme="blue"
                aria-label="Locked by"
                icon={<LockIcon />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody textAlign={"center"}>
                <Avatar
                  size="md"
                  name={rfq.lockedBy.fullName}
                  src={rfq.lockedBy.avatar}
                />

                <Stack
                  align={"center"}
                  justify={"center"}
                  direction={"column"}
                  mt={3}
                >
                  <Badge px={2} py={1} fontWeight={"400"}>
                    Locked by: {rfq.lockedBy.fullName}
                  </Badge>
                  <Badge px={2} py={1} fontWeight={"400"}>
                    Locked until: {formattedDate}
                  </Badge>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </ScaleFade>
      );

      return lockedPopup;
    }

      
    return  (<Link as={RouterLink} to={`/rfq/${rfq.rfqId}`}>
        <IconButton
        size="sm"
        colorScheme="blue"
        aria-label="Edit RFQ"
        icon={<EditIcon />}
      />
    </Link>);
  };

  const tableRows = Rfqs.map((rfq) => (
    <Tr key={rfq.rfqId}>
      <Td>{rfq.rfqId}</Td>
      <Td>{rfq.projectName}</Td>
      <Td isNumeric>{rfq.targetPrice}</Td>
      <Td isNumeric>{rfq.bestQuotePrice}</Td>
      <Td>{rfq.supplierName}</Td>
      <Td>{Actions(rfq)}</Td>
    </Tr>
  ));

  const tableHeaders = (
    <Tr>
      <Th>Id</Th>
      <Th>Project name</Th>
      <Th isNumeric>Target Price</Th>
      <Th isNumeric>Best offer price</Th>
      <Th>SupplierName</Th>
      <Th>Actions</Th>
    </Tr>
  );

  return (
    <Container maxW="container.lg">
      <SkeletonText mt="4" noOfLines={5} spacing="8" isLoaded={!loading}>
        <div>
          <Table size="sm" variant={"striped"}>
            <Thead>{tableHeaders}</Thead>
            <Tbody>{tableRows}</Tbody>
          </Table>
        </div>
      </SkeletonText>
    </Container>
  );
}
