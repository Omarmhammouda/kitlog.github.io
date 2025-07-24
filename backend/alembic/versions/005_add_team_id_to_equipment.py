"""Add team_id to equipment table

Revision ID: 005
Revises: 004
Create Date: 2025-07-24 15:10:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '005'
down_revision = '004'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add team_id column to equipment table
    op.add_column('equipment', sa.Column('team_id', sa.Integer(), nullable=True))
    
    # Create index for team_id
    op.create_index(op.f('ix_equipment_team_id'), 'equipment', ['team_id'], unique=False)
    
    # Add foreign key constraint
    op.create_foreign_key('fk_equipment_team_id', 'equipment', 'teams', ['team_id'], ['id'])


def downgrade() -> None:
    # Drop foreign key constraint
    op.drop_constraint('fk_equipment_team_id', 'equipment', type_='foreignkey')
    
    # Drop index
    op.drop_index(op.f('ix_equipment_team_id'), table_name='equipment')
    
    # Drop column
    op.drop_column('equipment', 'team_id')
