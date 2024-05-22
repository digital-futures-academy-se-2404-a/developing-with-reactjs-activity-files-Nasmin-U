import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InfoModal from "../src/Components/utils/InfoModal";

describe('InfoModal Tests', () => {
   
    // Test that the closeModal function is called when the X is clicked
    // Test that the closeModal function is called when the button is clicked
    const mockCloseModal = vi.fn();

    afterEach(() => vi.resetAllMocks());

    test('should call the closeModal function when the X is clicked', async () => {

        render(<InfoModal closeModal={mockCloseModal} message="Test Message" />);

        const modalX = screen.getAllByRole(`button`)[0];

        await userEvent.click(modalX);

        expect(mockCloseModal).toHaveBeenCalled();
        
    });

    test('should call the closeModal function when the X is clicked', async () => {

        render(<InfoModal closeModal={mockCloseModal} message="Test Message" />);

        const modalCloseBtn = screen.getAllByRole(`button`)[1];

        await userEvent.click(modalCloseBtn);

        expect(mockCloseModal).toHaveBeenCalled();
        
    });
});