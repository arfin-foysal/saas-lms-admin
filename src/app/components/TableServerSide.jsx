import "../../assets/styles/_variables.scss"
import { memo, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { tableColor } from "../../utils/Theme";


const TableServerSide = ({column}) => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    //table state
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const columns = useMemo(
        () => column,
        [],
    );

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={""}
                // enableRowSelection
                getRowId={(row) => row.phoneNumber}
                // initialState={{ showColumnFilters: true }}
                manualFiltering
                enableColumnResizing
             
                manualPagination
                manualSorting
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                muiTopToolbarProps={{
                    style: {
                        backgroundColor: tableColor?tableColor:"#0675F8",
                    },
                }}
                muiToolbarAlertBannerProps={
                    isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                        }
                        : undefined
                }
                //row par page 
                muiTablePaginationProps={{
                    rowsPerPageOptions: [2, 5, 10],
                    // showFirstButton: false,
                    // showLastButton: false,
                }}

                state={{
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination,
                    showAlertBanner: isError,
                    showProgressBars: isRefetching,
                    sorting,
                }}
            />
        </>

    );
};
export default TableServerSide