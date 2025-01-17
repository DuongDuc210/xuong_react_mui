import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Tooltip,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import useProductsQuery from "../../../hook/UseProductsQuerry";
import useProductMutation from "../../../hook/UseProductMutation";
import UseCategory from "../../../hook/UseCategory";
import { formatCurrencyVND } from "../../../services/VND/Vnd";
import NotFound from "../../../page/website/Home/NotFound/NotFound";
import { IdProducts } from "@/interfaces/Products";
import React from "react";

interface Category {
  _id: string;
  name: string;
}

const AdminProductList = () => {
  const { data, isLoading } = useProductsQuery();
  const { mutate } = useProductMutation({ action: "DELETE" });
  const { data: categories, isLoading: loadingCategory } = UseCategory();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [minPrice] = React.useState("");
  const [maxPrice] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("asc"); // State for sorting order

  if (isLoading || loadingCategory) return <CircularProgress />;
  if (!data) return <NotFound />;

  const handleDelete = async (id: number | string) => {
    await mutate({ _id: id } as IdProducts);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
    setPage(0);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredData = data.filter((product: IdProducts) => {
    const isInCategory =
      selectedCategory === "" || product.category === selectedCategory;
    const isInPriceRange =
      (minPrice === "" || product.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || product.price <= parseFloat(maxPrice));
    return isInCategory && isInPriceRange;
  });

  const sortedData = filteredData.sort((a: IdProducts, b: IdProducts) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Danh Sách Sản Phẩm
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
            <InputLabel id="category-filter-label">Danh mục</InputLabel>
            <Select
              labelId="category-filter-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Danh mục"
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {categories.map((category: Category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Thêm sản phẩm" arrow>
            <Link to={`/admin/productAdd`} style={{ textDecoration: "none" }}>
              <IconButton
                sx={{
                  background:
                    "linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #6a1b9a 40%, #ab47bc 100%)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  },
                  transition: "background 0.3s, boxShadow 0.3s",
                }}
              >
                <AddIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleSortOrderChange}
            sx={{ marginLeft: 2 }}
          >
            {sortOrder === "asc" ? "Giá tăng dần" : "Giá giảm dần"}
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Giảm giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((product: IdProducts) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>
                  {product.discount > 0
                    ? formatCurrencyVND(
                        product.price * (1 - product.discount / 100)
                      )
                    : formatCurrencyVND(product.price)}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      width: "350px",
                      height: "50px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      fontWeight: 500,
                      padding: "4px",
                    }}
                  >
                    {product.description}
                  </Box>
                </TableCell>
                <TableCell>
                  {product.discount > 0 ? `${product.discount}%` : "Không có"}
                </TableCell>
                <TableCell>
                  {categories?.find(
                    (cat: Category) => cat._id === product.category
                  )?.name || "Không có"}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/product/edit/${product._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => product._id && handleDelete(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[6, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AdminProductList;
