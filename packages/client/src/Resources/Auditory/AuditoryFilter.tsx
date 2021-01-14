import React from 'react';
import { Form } from 'react-final-form';
import { TextInput, SelectInput } from 'react-admin';
import { Box, Button } from '@material-ui/core';
import ContentFilter from '@material-ui/icons/FilterList';
import Close from '@material-ui/icons/Close';

const AuditoryFilter = (props) => {
    return props.context === 'button' ? <FilterButton {...props} /> : <FilterForm {...props} />;
};

export default AuditoryFilter;

const FilterButton = ({ showFilter }) => (
    <Button size="small" color="primary" onClick={() => showFilter('main')} startIcon={<ContentFilter />}>
        Filter
    </Button>
);

const FilterForm = ({ displayedFilters, filterValues, setFilters, hideFilter, open }) => {
    if (!displayedFilters.main) return null;

    const onSubmit = (values) => {
        if (Object.keys(values).length > 0) {
            setFilters(values);
        } else {
            hideFilter('main');
        }
    };

    const resetFilter = () => {
        setFilters({}, []);
    };

    return (
        <div>
            <Form onSubmit={onSubmit} initialValues={filterValues}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box mt={8} />
                        <Box display="flex" alignItems="flex-end" mb={1}>
                            {
                                <Box component="span" mr={2}>
                                    <TextInput resettable helperText={false} source="q" label="Search" />
                                </Box>
                            }
                            {/* Filter by status */}
                            {/* <Box component="span" mr={2}>
                                <SelectInput source="status" resettable helperText={false} choices={orderStatus} />
                            </Box> */}
                            <Box component="span" mr={2} mb={1.5}>
                                <Button variant="outlined" color="primary" type="submit" startIcon={<ContentFilter />}>
                                    Go
                                </Button>
                            </Box>
                            <Box component="span" mb={1.5}>
                                <Button variant="outlined" onClick={resetFilter} startIcon={<Close />}>
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Form>
        </div>
    );
};
