import styled from '@emotion/styled';
import { RATING_OPTIONS, type RatingKey } from '../constants/rating';

interface RatingFilterProps {
    selectedKey: RatingKey;
    onChange: (key: RatingKey) => void;
}

const RatingFilter = ({ selectedKey, onChange }: RatingFilterProps) => {
    return (
        <ChipList role ="radiogroup" aria-label="별점 필터" >
    {
        RATING_OPTIONS.map((option) => {
            const isSelected = option.key === selectedKey;

            return (
                <li key={option.key}>
                    <Chip
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        isSelected={isSelected}
                        onClick={() => {
                            if (!isSelected) onChange(option.key);
                        }}
                    >
                        {option.label}
                    </Chip>
                </li>
            );
        })}
    </ChipList>
    );

};

export default RatingFilter;

const ChipList = styled.ul`
    display: flex;
    flew-wrap: wrap;
    gap: 8px;  
    margin-bottom: 32px;
`;

 const Chip = styled.button<{ isSelected: boolean }>`
    padding: 8px 18px;
    border-radius: ${({ theme }) => theme.radius.full};
    font-size: 14px;
    font-weight: 600;
    transtion: background-color 0.2s ease, color 0.2s ease;
    background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : theme.colors.surface)};
    color: ${({ theme, isSelected}) => (isSelected ? theme.colors.primaryText : theme.colors.textSub)};
    &:hover{
        color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primaryText : theme.colors.text)};
    }
`;

